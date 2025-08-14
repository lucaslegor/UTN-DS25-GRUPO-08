import { Request, Response } from 'express';
import * as polizaService from '../services/poliza.service';

// GET /api/polizas
export async function getAllPolizas(req: Request, res: Response) {
  const data = await polizaService.getAllPolizas();
  res.json({ polizas: data, total: data.length });
}

// GET /api/polizas/:id
export async function getPolizaById(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

  const poliza = await polizaService.getPolizaById(id);
  if (!poliza) return res.status(404).json({ message: "Póliza no encontrada" });

  res.json({ poliza });
}

// POST /api/polizas/:idPedido
export async function createPoliza(req: Request<{ idPedido: string }>, res: Response) {
  const idPedido = Number(req.params.idPedido);
  if (isNaN(idPedido)) return res.status(400).json({ message: "ID de pedido inválido" });

  try {
    const nuevaPoliza = await polizaService.createPoliza(idPedido, req.body);
    res.status(201).json({ poliza: nuevaPoliza, message: "Póliza creada exitosamente" });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

// PUT /api/polizas/:id
export async function updatePoliza(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

  try {
    const updated = await polizaService.updatePoliza(id, req.body);
    res.json({ poliza: updated, message: "Póliza actualizada" });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

// DELETE /api/polizas/:id
export async function deletePoliza(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

  const deleted = await polizaService.deletePoliza(id);
  if (!deleted) return res.status(404).json({ message: "Póliza no encontrada" });

  res.json({ poliza: deleted, message: "Póliza eliminada" });
}
