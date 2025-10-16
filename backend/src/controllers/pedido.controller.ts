import { Request, Response, NextFunction } from "express";
import {
  CrearPedidoRequest,
  PedidoResponse,
  PedidosListResponse,
} from "../types/pedidos.types";
import * as pedidoService from "../services/pedidos.service";

// GET /api/pedidos
export async function listarPedidos(
  req: Request,
  res: Response<PedidosListResponse>,
  next: NextFunction
) {
  try {
    const username = typeof req.query.username === 'string' ? req.query.username : undefined;
    const pedidos = await pedidoService.listarPedidos(username);
    res.json({ pedidos, total: pedidos.length });
  } catch (error) {
    next(error);
  }
}

// GET /api/pedidos/:id
export async function obtenerPedidoPorId(
  req: Request,
  res: Response<PedidoResponse | { message: string }>,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const pedido = await pedidoService.obtenerPedidoPorId(id);
    if (!pedido) return res.status(404).json({ message: "Pedido no encontrado" });
    res.json({ pedido });
  } catch (error) {
    next(error);
  }
}

// POST /api/pedidos
export async function crearPedido(
  req: Request<{}, {}, CrearPedidoRequest & { idUsuario?: number }>,
  res: Response<PedidoResponse | { message: string }>,
  next: NextFunction
) {
  try {
    const idUsuario =
      (res.locals?.user && (res.locals.user.idUsuario || res.locals.user.id)) ??
      ((req as any).user && ((req as any).user.idUsuario || (req as any).user.id)) ??
      req.body.idUsuario;

    if (!idUsuario) {
      return res.status(400).json({ message: "idUsuario requerido (token o body)" });
    }

    const created = await pedidoService.crearPedido(Number(idUsuario), req.body);
    res.status(201).json({ pedido: created, message: "Pedido creado correctamente" });
  } catch (error) {
    next(error);
  }
}

// PUT /api/pedidos/:id
export async function actualizarPedido(
  req: Request,
  res: Response<PedidoResponse | { message: string }>,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const updated = await pedidoService.actualizarPedido(id, req.body);
    if (!updated) return res.status(404).json({ message: "Pedido no encontrado" });
    res.json({ pedido: updated, message: "Pedido actualizado correctamente" });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/pedidos/:id
export async function eliminarPedido(
  req: Request,
  res: Response<PedidoResponse | { message: string }>,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const eliminado = await pedidoService.eliminarPedido(id);
    if (!eliminado) return res.status(404).json({ message: "Pedido no encontrado" });
    res.json({ pedido: eliminado, message: "Pedido eliminado correctamente" });
  } catch (error) {
    next(error);
  }
}
