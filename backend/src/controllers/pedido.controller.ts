import { Request, Response, NextFunction } from 'express';
import {
  Pedido,
  CrearPedidoRequest,
  PedidoResponse,
  PedidosListResponse,
} from '../types/pedidos.types';
import * as pedidoService from '../services/pedidos.service';

// GET /api/pedidos
export async function listarPedidos(
  req: Request,
  res: Response<PedidosListResponse>,
  next: NextFunction
) {
  try {
    const pedidos = await pedidoService.listarPedidos();
    res.json({
      pedidos,
      total: pedidos.length,
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/pedidos/:id
export async function obtenerPedidoPorId(
  req: Request<{ id: string }>,
  res: Response<PedidoResponse>,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const pedido = await pedidoService.obtenerPedidoPorId(parseInt(id, 10));
    res.json({
      pedido,
      message: 'Pedido recuperado correctamente',
    });
  } catch (error) {
    next(error);
  }
}

// POST /api/pedidos
export async function crearPedido(
  req: Request<{}, PedidoResponse, CrearPedidoRequest>,
  res: Response<PedidoResponse>,
  next: NextFunction
) {
  try {
    const nuevoPedido = await pedidoService.crearPedido(req.body);
    res.status(201).json({
      pedido: nuevoPedido,
      message: 'Pedido creado correctamente',
    });
  } catch (error) {
    next(error);
  }
}

// PUT /api/pedidos/:id
export async function actualizarPedido(
  req: Request<{ id: string }, PedidoResponse, Partial<Pedido>>,
  res: Response<PedidoResponse>,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const pedidoActualizado = await pedidoService.actualizarPedido(
      parseInt(id, 10),
      req.body
    );
    res.json({
      pedido: pedidoActualizado,
      message: 'Pedido actualizado correctamente',
    });
  } catch (error) {
    next(error);
  }
}
