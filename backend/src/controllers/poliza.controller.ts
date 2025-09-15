import { Request, Response, NextFunction } from 'express';
import * as polizaService from '../services/poliza.service';

// GET /api/polizas
export async function getAllPolizas(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, role } = req.user!; // Ya está autenticado por el middleware
    
    let polizas;
    if (role === 'ADMIN') {
      // Admin puede ver todas las pólizas
      polizas = await polizaService.getAllPolizas();
    } else {
      // Usuario normal solo ve sus pólizas (filtradas por usuario)
      polizas = await polizaService.getPolizasByUsuario(id);
    }
    
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

    const { id: userId, role } = req.user!;
    const esAdmin = role === 'ADMIN';

    let poliza;
    if (esAdmin) {
      // Admin puede ver cualquier póliza
      poliza = await polizaService.getPolizaById(id);
    } else {
      // Usuario normal solo puede ver sus propias pólizas
      poliza = await polizaService.getPolizaByIdConOwnership(id, userId);
    }

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

    const { id: userId, role } = req.user!;
    const esAdmin = role === 'ADMIN';

    // Verificar que el pedido pertenece al usuario (si no es admin)
    if (!esAdmin) {
      const pedidoExiste = await polizaService.verificarOwnershipPedido(idPedido, userId);
      if (!pedidoExiste) {
        return res.status(403).json({ message: "No tienes permisos para crear pólizas en este pedido" });
      }
    }

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

    // La autorización ya se maneja en las rutas con authorize('ADMIN')
    // Solo los administradores pueden llegar hasta aquí
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

    // La autorización ya se maneja en las rutas con authorize('ADMIN')
    // Solo los administradores pueden llegar hasta aquí
    const deleted = await polizaService.deletePoliza(id);
    if (!deleted) return res.status(404).json({ message: "Póliza no encontrada" });

    res.json({ poliza: deleted, message: "Póliza eliminada exitosamente" });
  } catch (err) {
    next(err);
  }
}
