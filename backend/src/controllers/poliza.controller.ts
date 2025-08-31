import { Request, Response, NextFunction } from 'express';
import * as polizaService from '../services/poliza.service';

// GET /api/polizas
export async function getAllPolizas(_req: Request, res: Response, next: NextFunction) {
  try {
    const polizas = await polizaService.getAllPolizas();
    res.json({ polizas, total: polizas.length });
  } catch (err) {
    next(err);
  }
}

// GET /api/polizas/:id
export async function getPolizaById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

    const poliza = await polizaService.getPolizaById(id);
    if (!poliza) return res.status(404).json({ message: "Póliza no encontrada" });

    res.json({ poliza });
  } catch (err) {
    next(err);
  }
}

// POST /api/polizas/:idPedido
export async function createPoliza(req: Request<{ idPedido: string }>, res: Response, next: NextFunction) {
  try {
    const idPedido = Number(req.params.idPedido);
    if (isNaN(idPedido)) return res.status(400).json({ message: "ID de pedido inválido" });

    const nuevaPoliza = await polizaService.createPoliza(idPedido, req.body);
    res.status(201).json({ poliza: nuevaPoliza, message: "Póliza creada exitosamente" });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

// PUT /api/polizas/:id
export async function updatePoliza(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

    const updated = await polizaService.updatePoliza(id, req.body);
    res.json({ poliza: updated, message: "Póliza actualizada exitosamente" });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

// DELETE /api/polizas/:id
export async function deletePoliza(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

    const deleted = await polizaService.deletePoliza(id);
    if (!deleted) return res.status(404).json({ message: "Póliza no encontrada" });

    res.json({ poliza: deleted, message: "Póliza eliminada exitosamente" });
  } catch (err) {
    next(err);
  }
}
