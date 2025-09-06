import prisma from "../config/prisma";
import {
  Pedido,
  PedidoItem,
  CrearPedidoRequest,
} from "../types/pedidos.types";

/* ========================
 *   Helpers
 * ======================== */

function mapRowToPedido(row: any): Pedido {
  const items: PedidoItem[] = (row.items ?? []).map((it: any) => ({
    productId: it.idProducto,
    titulo: it.titulo,
    precio: Number(it.precio),
    cantidad: it.cantidad,
  }));

  return {
    idPedido: row.id,
    idUsuario: row.idUsuario,
    items,
    subtotal: Number(row.subtotal),
    total: Number(row.total),
    moneda: row.moneda,
    estado: row.estado,
    poliza: row.poliza ? {
      id: row.poliza.id,
      idPedido: row.poliza.idPedido,
      archivoUrl: row.poliza.archivoUrl,
      estado: row.poliza.estado,
      createdAt: row.poliza.createdAt,
      updatedAt: row.poliza.updatedAt,
    } : undefined,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

/* ========================
 *   CRUD
 * ======================== */

export async function listarPedidos(): Promise<Pedido[]> {
  const rows = await prisma.pedido.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true, poliza: true },
  });
  return rows.map(mapRowToPedido);
}

export async function obtenerPedidoPorId(id: number): Promise<Pedido | null> {
  const row = await prisma.pedido.findUnique({
    where: { id },
    include: { items: true, poliza: true },
  });
  return row ? mapRowToPedido(row) : null;
}

export async function crearPedido(
  idUsuario: number,
  data: CrearPedidoRequest
): Promise<Pedido> {
  // 1) productos existentes
  const ids = data.items.map(i => i.productId);
  const productos = await prisma.producto.findMany({
    where: { id: { in: ids } },
  });
  if (productos.length !== ids.length) {
    const notFound = ids.filter(id => !productos.find(p => p.id === id));
    throw new Error(`Productos inexistentes: ${notFound.join(", ")}`);
  }

  // 2) preparar items
  const itemsToCreate = productos.map(p => {
    const cant = data.items.find(i => i.productId === p.id)?.cantidad ?? 1;
    return {
      idProducto: p.id,
      titulo: p.titulo,
      precio: p.precio, // Decimal en Prisma acepta number
      cantidad: cant,
    };
  });

  const subtotal = itemsToCreate.reduce((acc, it) => acc + Number(it.precio) * it.cantidad, 0);
  const total = subtotal; // ajustar si hay recargos/descuentos

  const created = await prisma.pedido.create({
    data: {
      idUsuario,
      subtotal,
      total,
      moneda: "ARS",
      items: {
        create: itemsToCreate.map(it => ({
          idProducto: it.idProducto,
          titulo: it.titulo,
          precio: it.precio,
          cantidad: it.cantidad,
        })),
      },
    },
    include: { items: true, poliza: true },
  });

  return mapRowToPedido(created);
}

type ActualizarPedidoRequest = {
  estado?: Pedido["estado"];
  items?: { productId: number; cantidad?: number }[];
};

export async function actualizarPedido(
  id: number,
  body: ActualizarPedidoRequest
): Promise<Pedido | null> {
  // Si hay items, reemplazamos completamente y recalculamos totales
  if (body.items && body.items.length > 0) {
    const productos = await prisma.producto.findMany({
      where: { id: { in: body.items.map(i => i.productId) } },
    });
    if (productos.length !== body.items.length) {
      const notFound = body.items
        .map(i => i.productId)
        .filter(pid => !productos.find(p => p.id === pid));
      throw new Error(`Productos inexistentes: ${notFound.join(", ")}`);
    }

    const itemsToCreate = productos.map(p => {
      const cant = body.items?.find(i => i.productId === p.id)?.cantidad ?? 1;
      return {
        idProducto: p.id,
        titulo: p.titulo,
        precio: p.precio,
        cantidad: cant,
      };
    });

    const subtotal = itemsToCreate.reduce((acc, it) => acc + Number(it.precio) * it.cantidad, 0);
    const total = subtotal;

    try {
      const updated = await prisma.$transaction(async (tx) => {
        // Fuerza error si no existe
        await tx.pedido.update({ where: { id }, data: {} });

        await tx.pedidoItem.deleteMany({ where: { idPedido: id } });
        await tx.pedidoItem.createMany({
          data: itemsToCreate.map(it => ({
            idPedido: id,
            idProducto: it.idProducto,
            titulo: it.titulo,
            precio: it.precio,
            cantidad: it.cantidad,
          })),
        });

        return await tx.pedido.update({
          where: { id },
          data: {
            subtotal,
            total,
            ...(body.estado ? { estado: body.estado } : {}),
          },
          include: { items: true, poliza: true },
        });
      });

      return mapRowToPedido(updated);
    } catch (e: any) {
      if (e.code === "P2025") return null;
      throw e;
    }
  }

  // Solo estado (o nada)
  try {
    const updated = await prisma.pedido.update({
      where: { id },
      data: { ...(body.estado ? { estado: body.estado } : {}) },
      include: { items: true, poliza: true },
    });
    return mapRowToPedido(updated);
  } catch (e: any) {
    if (e.code === "P2025") return null;
    throw e;
  }
}

export async function eliminarPedido(id: number): Promise<Pedido | null> {
  try {
    const deleted = await prisma.pedido.delete({
      where: { id },
      include: { items: true, poliza: true },
    });
    return mapRowToPedido(deleted);
  } catch (e: any) {
    if (e.code === "P2025") return null;
    throw e;
  }
}
