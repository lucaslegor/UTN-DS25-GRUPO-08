import { Pedido, PedidoItem, CrearPedidoRequest } from '../types/pedidos.types';

// Catálogo simple (mock). En siguiente etapa: DB real.
const catalogo = [
  { id: 101, titulo: 'Plan Básico', precio: 15000 },
  { id: 102, titulo: 'Plan Full', precio: 28000 },
  { id: 103, titulo: 'Adicional Hogar', precio: 9000 },
];

// Persistencia en memoria (MVP)
let pedidos: Pedido[] = [];
let lastId = 0;

// Helpers internos
function resolverItems(input: { productId: number; cantidad?: number }[]): PedidoItem[] {
  if (!Array.isArray(input) || input.length === 0) {
    const e: any = new Error('El pedido debe tener al menos un ítem');
    e.statusCode = 400;
    throw e;
  }
  return input.map(({ productId, cantidad }) => {
    const prod = catalogo.find(p => p.id === productId);
    if (!prod) {
      const e: any = new Error(`Producto ${productId} inexistente`);
      e.statusCode = 400;
      throw e;
    }
    return {
      productId,
      titulo: prod.titulo,
      precio: prod.precio,
      cantidad: cantidad ?? 1,
    };
  });
}

function calcularSubtotal(items: PedidoItem[]): number {
  return items.reduce((acc, it) => acc + it.precio * it.cantidad, 0);
}

function calcularTotal(subtotal: number): number {
  // Lugar para impuestos/descuentos futuros
  return subtotal;
}

// GET all
export async function listarPedidos(): Promise<Pedido[]> {
  return pedidos;
}

// GET by id
export async function obtenerPedidoPorId(id: number): Promise<Pedido> {
  const pedido = pedidos.find(p => p.idPedido === id);
  if (!pedido) {
    const error: any = new Error('Pedido no encontrado');
    error.statusCode = 404;
    throw error;
  }
  return pedido;
}

// CREATE
export async function crearPedido(data: CrearPedidoRequest): Promise<Pedido> {
  if (!data || !data.items) {
    const e: any = new Error('Body inválido');
    e.statusCode = 400;
    throw e;
  }
  if (data.moneda !== 'ARS') {
    const e: any = new Error("Solo se admite moneda 'ARS'");
    e.statusCode = 400;
    throw e;
  }

  const items = resolverItems(data.items);
  const subtotal = calcularSubtotal(items);
  const total = calcularTotal(subtotal);
  const ahora = new Date();

  const nuevoPedido: Pedido = {
    idPedido: ++lastId,
    idUsuario: 1, // En producción: desde token/auth
    items,
    subtotal,
    total,
    moneda: 'ARS',
    estado: 'CREADO',
    createdAt: ahora,
    updatedAt: ahora,
  };

  pedidos.push(nuevoPedido);
  return nuevoPedido;
}

// UPDATE
export async function actualizarPedido(id: number, data: Partial<Pedido>): Promise<Pedido> {
  const index = pedidos.findIndex(p => p.idPedido === id);
  if (index === -1) {
    const error: any = new Error('Pedido no encontrado');
    error.statusCode = 404;
    throw error;
  }

  // Si actualizan items: recalcular desde catálogo
  let items = pedidos[index].items;
  if (data.items) {
    items = data.items.map(it => {
      const prod = catalogo.find(p => p.id === it.productId);
      if (!prod) {
        const e: any = new Error(`Producto ${it.productId} inexistente`);
        e.statusCode = 400;
        throw e;
      }
      return {
        productId: it.productId,
        titulo: prod.titulo,
        precio: prod.precio,
        cantidad: it.cantidad ?? 1,
      };
    });
  }

  // Validar moneda si viene
  const moneda = data.moneda ?? pedidos[index].moneda;
  if (moneda !== 'ARS') {
    const e: any = new Error("Solo se admite moneda 'ARS'");
    e.statusCode = 400;
    throw e;
  }

  const subtotal = calcularSubtotal(items);
  const total = calcularTotal(subtotal);

  pedidos[index] = {
    ...pedidos[index],
    ...data,
    items,
    subtotal,
    total,
    moneda,
    updatedAt: new Date(),
  };

  return pedidos[index];
}
