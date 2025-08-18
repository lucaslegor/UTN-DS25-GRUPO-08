// src/services/cart.service.ts
import { Cart, CartItem, AddToCartRequest } from '../types/carrito.types';
import { randomUUID } from 'crypto';

// ✅ Store en memoria
const carts = new Map<string, Cart>();

// 🔧 Si en el futuro deben calcular $total en base a precios,
// reemplacen esta función para consultar productos/DB:
function recalcTotal(_items: CartItem[]): number {
  // Por ahora, dejamos total=0 para no romper nada del resto del equipo.
  // Si quieren contar unidades: return items.reduce((a, i) => a + (i.cantidad ?? 1), 0);
  return 0;
}

function ensureCantidad(n?: number): number {
  return typeof n === 'number' && n > 0 ? Math.floor(n) : 1;
}

export async function listAll(): Promise<Cart[]> {
  return Array.from(carts.values());
}

export async function createCart(): Promise<Cart> {
  const idCarrito = randomUUID();
  const now = new Date();
  const cart: Cart = {
    idCarrito,
    items: [],
    total: 0,
    moneda: 'ARS',
    updatedAt: now,
  };
  carts.set(idCarrito, cart);
  return cart;
}

export async function getCart(idCarrito: string): Promise<Cart | null> {
  return carts.get(idCarrito) ?? null;
}

export async function deleteCart(idCarrito: string): Promise<boolean> {
  return carts.delete(idCarrito);
}

export async function addItem(idCarrito: string, req: AddToCartRequest): Promise<Cart | null> {
  const cart = carts.get(idCarrito);
  if (!cart) return null;

  const cantidad = ensureCantidad(req.cantidad);
  const idx = cart.items.findIndex(i => i.productId === req.productId);

  if (idx >= 0) {
    cart.items[idx] = {
      ...cart.items[idx],
      cantidad: (cart.items[idx].cantidad ?? 1) + cantidad,
    };
  } else {
    cart.items.push({ productId: req.productId, cantidad });
  }

  cart.total = recalcTotal(cart.items);
  cart.updatedAt = new Date();
  carts.set(idCarrito, cart);
  return cart;
}

export async function setItemCantidad(
  idCarrito: string,
  productId: number,
  cantidad: number
): Promise<Cart | null> {
  const cart = carts.get(idCarrito);
  if (!cart) return null;

  const idx = cart.items.findIndex(i => i.productId === productId);
  if (idx < 0) {
    // Si no existe el ítem, no rompemos: devolvemos el carrito tal cual.
    return cart;
  }

  const qty = ensureCantidad(cantidad);
  if (qty <= 0) {
    cart.items.splice(idx, 1);
  } else {
    cart.items[idx] = { ...cart.items[idx], cantidad: qty };
  }

  cart.total = recalcTotal(cart.items);
  cart.updatedAt = new Date();
  carts.set(idCarrito, cart);
  return cart;
}

export async function removeItem(
  idCarrito: string,
  productId: number
): Promise<Cart | null> {
  const cart = carts.get(idCarrito);
  if (!cart) return null;

  cart.items = cart.items.filter(i => i.productId !== productId);
  cart.total = recalcTotal(cart.items);
  cart.updatedAt = new Date();
  carts.set(idCarrito, cart);
  return cart;
}

export async function clearItems(idCarrito: string): Promise<Cart | null> {
  const cart = carts.get(idCarrito);
  if (!cart) return null;

  cart.items = [];
  cart.total = 0;
  cart.updatedAt = new Date();
  carts.set(idCarrito, cart);
  return cart;
}
