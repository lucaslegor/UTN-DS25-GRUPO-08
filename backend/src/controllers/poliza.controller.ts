import { Request, Response, NextFunction } from 'express';
import * as polizaService from '../services/poliza.service';
import fs from 'fs';
import { uploadLocalFile, deleteByPublicId } from '../services/cloudinary.service';
import prisma from "../config/prisma";

// GET /api/polizas
export async function getAllPolizas(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, role } = req.user!; // Ya está autenticado por el middleware
    
    let polizas;
    if (role === 'ADMINISTRADOR') {
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
    const esAdmin = role === 'ADMINISTRADOR';

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

// POST /api/polizas/:idSolicitud
export async function createPoliza(req: Request<{ idSolicitud: string }>, res: Response, next: NextFunction) {
  try {
    const idSolicitud = Number(req.params.idSolicitud);
    if (isNaN(idSolicitud)) return res.status(400).json({ message: "ID de solicitud inválido" });

    const { id: userId, role } = req.user!;
    const esAdmin = role === 'ADMINISTRADOR';

    // Verificar que la solicitud pertenece al usuario (si no es admin)
    if (!esAdmin) {
      const solicitudExiste = await polizaService.verificarOwnershipSolicitud(idSolicitud, userId);
      if (!solicitudExiste) {
        return res.status(403).json({ message: "No tienes permisos para crear pólizas en esta solicitud" });
      }
    }

    // Si vino archivo subido, subimos a Cloudinary y usamos secure_url
    let archivoUrl = (req.body as any)?.archivoUrl as string | undefined;
    let archivoPublicId: string | undefined;
    const file = (req as any).file as Express.Multer.File | undefined;
    if (file) {
      const { url, publicId } = await uploadLocalFile(file.path, 'polizas', 'auto');
      archivoUrl = url;
      archivoPublicId = publicId;
      fs.unlink(file.path, () => {});
    }
    if (!archivoUrl) {
      return res.status(400).json({ message: 'Debe adjuntar un archivo de póliza' });
    }

    const nuevaPoliza = await polizaService.createPoliza(idSolicitud, { archivoUrl, archivoPublicId });
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
    // Construir payload desde multipart/form-data si hay archivo
    let payload: any = { ...(req.body as any) };
    const file = (req as any).file as Express.Multer.File | undefined;
    let prevPublicId: string | undefined;
    try {
      const prev = await prisma.poliza.findUnique({ where: { id }, select: { archivoPublicId: true } });
      prevPublicId = prev?.archivoPublicId || undefined;
    } catch {}
    if (file) {
      const { url, publicId } = await uploadLocalFile(file.path, 'polizas', 'auto');
      payload.archivoUrl = url;
      payload.archivoPublicId = publicId;
      fs.unlink(file.path, () => {});
    }

    if (!payload || Object.keys(payload).length === 0) {
      return res.status(400).json({ message: 'Debe adjuntar un archivo o datos para actualizar' });
    }

    const updated = await polizaService.updatePoliza(id, payload);
    res.json({ poliza: updated, message: "Póliza actualizada exitosamente" });
    if (payload.archivoPublicId && prevPublicId && payload.archivoPublicId !== prevPublicId) {
      try { await deleteByPublicId(prevPublicId); } catch {}
    }
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
    let prevPublicId: string | undefined;
    try {
      const prev = await prisma.poliza.findUnique({ where: { id }, select: { archivoPublicId: true } });
      prevPublicId = prev?.archivoPublicId || undefined;
    } catch {}
    const deleted = await polizaService.deletePoliza(id);
    if (!deleted) return res.status(404).json({ message: "Póliza no encontrada" });

    res.json({ poliza: deleted, message: "Póliza eliminada exitosamente" });
    if (prevPublicId) {
      try { await deleteByPublicId(prevPublicId); } catch {}
    }
  } catch (err) {
    next(err);
  }
}
