import { Request, Response, NextFunction } from 'express';
import * as polizaService from '../services/poliza.service';
import fs from 'fs';
import { uploadLocalFile, deleteByPublicId } from '../services/cloudinary.service';
import prisma from "../config/prisma";

export async function getAllPolizas(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, role } = req.user!;
    
    let polizas;
    if (role === 'ADMINISTRADOR') {
      polizas = await polizaService.getAllPolizas();
    } else {
      polizas = await polizaService.getPolizasByUsuario(id);
    }
    
    res.json({ polizas, total: polizas.length });
  } catch (err) {
    next(err);
  }
}

export async function getPolizaById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

    const { id: userId, role } = req.user!;
    const esAdmin = role === 'ADMINISTRADOR';

    let poliza;
    if (esAdmin) {
      poliza = await polizaService.getPolizaById(id);
    } else {
      poliza = await polizaService.getPolizaByIdConOwnership(id, userId);
    }

    if (!poliza) return res.status(404).json({ message: "Póliza no encontrada" });

    res.json({ poliza });
  } catch (err) {
    next(err);
  }
}

export async function createPoliza(req: Request<{ idSolicitud: string }>, res: Response, next: NextFunction) {
  try {
    const idSolicitud = Number(req.params.idSolicitud);
    if (isNaN(idSolicitud)) return res.status(400).json({ message: "ID de solicitud inválido" });

    const { id: userId, role } = req.user!;
    const esAdmin = role === 'ADMINISTRADOR';

    if (!esAdmin) {
      const solicitudExiste = await polizaService.verificarOwnershipSolicitud(idSolicitud, userId);
      if (!solicitudExiste) {
        return res.status(403).json({ message: "No tienes permisos para crear pólizas en esta solicitud" });
      }
    }

    let archivoUrl = (req.body as any)?.archivoUrl as string | undefined;
    let archivoPublicId: string | undefined;
    const file = (req as any).file as Express.Multer.File | undefined;
    if (file) {
      const { url, publicId } = await uploadLocalFile(file.path, 'polizas', 'auto', file.mimetype);
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

export async function updatePoliza(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

    let payload: any = { ...(req.body as any) };
    const file = (req as any).file as Express.Multer.File | undefined;
    let prevPublicId: string | undefined;
    try {
      const prev = await prisma.poliza.findUnique({ where: { id }, select: { archivoPublicId: true } });
      prevPublicId = prev?.archivoPublicId || undefined;
    } catch {}
    if (file) {
      const { url, publicId } = await uploadLocalFile(file.path, 'polizas', 'auto', file.mimetype);
      payload.archivoUrl = url;
      payload.archivoPublicId = publicId;
      fs.unlink(file.path, () => {});
    }

    if (!payload || Object.keys(payload).length === 0) {
      return res.status(400).json({ message: 'Debe adjuntar un archivo o datos para actualizar' });
    }

    payload.updatedAt = new Date();

    const updated = await polizaService.updatePoliza(id, payload);
    
    res.json({ poliza: updated, message: "Póliza actualizada exitosamente" });
    if (payload.archivoPublicId && prevPublicId && payload.archivoPublicId !== prevPublicId) {
      try { await deleteByPublicId(prevPublicId); } catch {}
    }
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

export async function deletePoliza(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

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
