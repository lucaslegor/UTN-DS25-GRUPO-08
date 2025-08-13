import { Pedido, PedidoItem, CrearPedidoRequest } from '../types/pedidos.types';

// Catálogo mock para resolver productId → {titulo, precio}
const catalogo = [
  { id: 101, titulo: 'Plan Básico', precio: 15000 },
  { id: 102, titulo: 'Plan Full', precio: 28000 },
  { id: 103, titulo: 'Adicional Hogar', precio: 9000 },
];

// Datos en memoria (MVP)
let pedidos: Pedido[] = [];
let lastId = 0;

// Helpers internos
function resolveItems(input: { productId: number; cantidad?: number }[]): PedidoItem[] {
  if (!Array.isArray(input) || input.length === 0) {
    const e: any = new Error('Pedido must have at least one item');
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

function calcSubtotal(items: PedidoItem[]): number {
  return items.reduce((acc, it) => acc + it.precio * it.cantidad, 0);
}

function calcTotal(subtotal: number): number {
  // Espacio para impuestos/descuentos futuros
  return subtotal;
}

// GET all
export async function getAllPedidos(): Promise<Pedido[]> {
  return pedidos;
}

// GET by id
export async function getPedidoById(id: number): Promise<Pedido> {
  const pedido = pedidos.find(p => p.idPedido === id);
  if (!pedido) {
    const error: any = new Error('Pedido not found');
    error.statusCode = 404;
    throw error;
  }
  return pedido;
}

// CREATE
export async function createPedido(data: CrearPedidoRequest): Promise<Pedido> {
  // Validaciones mínimas estilo clase
  if (!data || !data.items) {
    const e: any = new Error('Invalid request body');
    e.statusCode = 400;
    throw e;
  }
  if (data.moneda !== 'ARS') {
    const e: any = new Error("Only 'ARS' currency is supported");
    e.statusCode = 400;
    throw e;
  }

  const items = resolveItems(data.items);
  const subtotal = calcSubtotal(items);
  const total = calcTotal(subtotal);
  const now = new Date();

  const newPedido: Pedido = {
    idPedido: ++lastId,
    idUsuario: 1, // en producción, desde el token
    items,
    subtotal,
    total,
    moneda: 'ARS',
    estado: 'CREADO',
    createdAt: now,
    updatedAt: now,
  };

  pedidos.push(newPedido);
  return newPedido;
}

// UPDATE
export async function updatePedido(id: number, data: Partial<Pedido>): Promise<Pedido> {
  const index = pedidos.findIndex(p => p.idPedido === id);
  if (index === -1) {
    const error: any = new Error('Pedido not found');
    error.statusCode = 404;
    throw error;
  }

  // Si cambian items, recalculamos; si cambian moneda, validamos
  let items = pedidos[index].items;
  if (data.items) {
    // Permitimos actualización con productId/cantidad y recalculamos desde catálogo
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

  const moneda = data.moneda ?? pedidos[index].moneda;
  if (moneda !== 'ARS') {
    const e: any = new Error("Only 'ARS' currency is supported");
    e.statusCode = 400;
    throw e;
  }

  const subtotal = calcSubtotal(items);
  const total = calcTotal(subtotal);

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
