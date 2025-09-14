// src/services/cart.service.ts
import { Cart, CartItem, AddToCartRequest } from '../types/carrito.types';
import prisma from '../config/prisma';

function parseCarritoId(idCarrito: string): number | null {
  const n = Number(idCarrito);
  return Number.isInteger(n) && n > 0 ? n : null;
}

function recalcTotal(_items: CartItem[]): number {
  return 0;
}

function ensureCantidad(n?: number): number {
  return typeof n === 'number' && n > 0 ? Math.floor(n) : 1;
}

// 🔧 Mapper DB -> DTO
function toCartDTO(row: any, items: any[]): Cart {
  return {
    idCarrito: String(row.id),
    items: items.map((it: any) => ({
      productId: it.idProducto,
      cantidad: it.cantidad ?? 1,
    })),
    total: Number(row.total) || 0,
    moneda: row.moneda, // "ARS"
    updatedAt: row.updatedAt,
  };
}

// 🔧 Cargar un carrito completo desde DB
async function loadCart(intId: number): Promise<Cart | null> {
  const row = await prisma.carrito.findUnique({
    where: { id: intId },
    include: { items: true },
  });
  if (!row) return null;
  return toCartDTO(row, row.items);
}

// -------------------------------------------------------------

export async function listAll(): Promise<Cart[]> {
  const rows = await prisma.carrito.findMany({
    include: { items: true },
    orderBy: { id: 'asc' },
  });
  return rows.map(r => toCartDTO(r, r.items));
}

export async function createCart(): Promise<Cart> {
  const created = await prisma.carrito.create({
    data: {
      total: 0,
    },
  });
  // Sin items al crear
  return {
    idCarrito: String(created.id),
    items: [],
    total: Number(created.total) || 0,
    moneda: created.moneda,
    updatedAt: created.updatedAt,
  };
}

export async function getCart(idCarrito: string): Promise<Cart | null> {
  const intId = parseCarritoId(idCarrito);
  if (!intId) return null;

  return loadCart(intId);
}

export async function deleteCart(idCarrito: string): Promise<boolean> {
  const intId = parseCarritoId(idCarrito);
  if (!intId) return false;

  const exists = await prisma.carrito.findUnique({ where: { id: intId } });
  if (!exists) return false;

  await prisma.$transaction([
    prisma.carritoItem.deleteMany({ where: { idCarrito: intId } }),
    prisma.carrito.delete({ where: { id: intId } }),
  ]);

  return true;
}

export async function addItem(idCarrito: string, req: AddToCartRequest): Promise<Cart | null> {
  const intId = parseCarritoId(idCarrito);
  if (!intId) return null;

  const cart = await prisma.carrito.findUnique({ where: { id: intId } });
  if (!cart) return null;

  const cantidad = ensureCantidad(req.cantidad);

  const key = { idCarrito_idProducto: { idCarrito: intId, idProducto: req.productId } };

  const existing = await prisma.carritoItem.findUnique({ where: key });

  if (existing) {
    await prisma.carritoItem.update({
      where: key,
      data: { cantidad: (existing.cantidad ?? 1) + cantidad },
    });
  } else {
    await prisma.carritoItem.create({
      data: {
        idCarrito: intId,
        idProducto: req.productId,
        cantidad,
      },
    });
  }

  await prisma.carrito.update({
    where: { id: intId },
    data: { total: 0 },
  });

  return loadCart(intId);
}

export async function setItemCantidad(
  idCarrito: string,
  productId: number,
  cantidad: number
): Promise<Cart | null> {
  const intId = parseCarritoId(idCarrito);
  if (!intId) return null;

  const cart = await prisma.carrito.findUnique({ where: { id: intId } });
  if (!cart) return null;

  const key = { idCarrito_idProducto: { idCarrito: intId, idProducto: productId } };
  const existing = await prisma.carritoItem.findUnique({ where: key });

  if (!existing) {
    return loadCart(intId);
  }

  const qty = ensureCantidad(cantidad);
  if (qty <= 0) {
    await prisma.carritoItem.delete({ where: key });
  } else {
    await prisma.carritoItem.update({
      where: key,
      data: { cantidad: qty },
    });
  }

  await prisma.carrito.update({
    where: { id: intId },
    data: { total: 0 },
  });

  return loadCart(intId);
}

export async function removeItem(idCarrito: string, productId: number): Promise<Cart | null> {
  const intId = parseCarritoId(idCarrito);
  if (!intId) return null;

  const cart = await prisma.carrito.findUnique({ where: { id: intId } });
  if (!cart) return null;

  await prisma.carritoItem.deleteMany({
    where: { idCarrito: intId, idProducto: productId },
  });

  await prisma.carrito.update({
    where: { id: intId },
    data: { total: 0 },
  });

  return loadCart(intId);
}

export async function clearItems(idCarrito: string): Promise<Cart | null> {
  const intId = parseCarritoId(idCarrito);
  if (!intId) return null;

  const cart = await prisma.carrito.findUnique({ where: { id: intId } });
  if (!cart) return null;

  await prisma.carritoItem.deleteMany({ where: { idCarrito: intId } });

  await prisma.carrito.update({
    where: { id: intId },
    data: { total: 0 },
  });

  return loadCart(intId);
}
