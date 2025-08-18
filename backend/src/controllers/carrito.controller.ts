// src/controllers/cart.controller.ts
import { Request, Response } from 'express';
import * as cartService from '../services/carrito.service';
import { AddToCartRequest, CartResponse } from '../types/carrito.types';

export async function listAll(req: Request, res: Response) {
  const carts = await cartService.listAll();
  res.json({ carts, total: carts.length });
}

export async function createCart(req: Request, res: Response) {
  const cart = await cartService.createCart();
  const body: CartResponse = { cart };
  res.status(201).json(body);
}

export async function getCart(req: Request, res: Response) {
  const { idCarrito } = req.params;
  const cart = await cartService.getCart(idCarrito);
  if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
  const body: CartResponse = { cart };
  res.json(body);
}

export async function deleteCart(req: Request, res: Response) {
  const { idCarrito } = req.params;
  const ok = await cartService.deleteCart(idCarrito);
  if (!ok) return res.status(404).json({ message: 'Carrito no encontrado' });
  res.status(204).send();
}

export async function addItem(req: Request, res: Response) {
  const { idCarrito } = req.params;
  const payload = req.body as AddToCartRequest;

  if (typeof payload?.productId !== 'number') {
    return res.status(400).json({ message: 'productId requerido' });
  }

  const cart = await cartService.addItem(idCarrito, payload);
  if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

  const body: CartResponse = { cart };
  res.status(200).json(body);
}

export async function setItemCantidad(req: Request, res: Response) {
  const { idCarrito, productId } = req.params;
  const cantidad = Number(req.body?.cantidad);

  if (Number.isNaN(Number(productId)) || Number.isNaN(cantidad)) {
    return res.status(400).json({ message: 'Parámetros inválidos' });
  }

  const cart = await cartService.setItemCantidad(idCarrito, Number(productId), cantidad);
  if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

  const body: CartResponse = { cart };
  res.json(body);
}

export async function removeItem(req: Request, res: Response) {
  const { idCarrito, productId } = req.params;
  if (Number.isNaN(Number(productId))) {
    return res.status(400).json({ message: 'productId inválido' });
  }

  const cart = await cartService.removeItem(idCarrito, Number(productId));
  if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

  const body: CartResponse = { cart };
  res.json(body);
}

export async function clearItems(req: Request, res: Response) {
  const { idCarrito } = req.params;
  const cart = await cartService.clearItems(idCarrito);
  if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

  const body: CartResponse = { cart };
  res.json(body);
}
