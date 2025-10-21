import { Request, Response, NextFunction } from "express";
import { SolicitudResponse, CrearSolicitudRequest, ActualizarSolicitudRequest } from "../types/solicitudes.types";
import * as solicitudesService from "../services/solicitudes.service";

export async function obtenerSolicitudes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as any).user?.id;
    const role = (req as any).user?.role; // Cambiado de 'rol' a 'role'
    
    console.log('obtenerSolicitudes: userId:', userId, 'role:', role);
    
    if (!userId) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    let solicitudes;
    if (role === 'ADMINISTRADOR') {
      // Los administradores ven todas las solicitudes
      console.log('obtenerSolicitudes: Cargando todas las solicitudes para administrador');
      solicitudes = await solicitudesService.getAllSolicitudes();
    } else {
      // Los usuarios ven solo sus solicitudes
      console.log('obtenerSolicitudes: Cargando solicitudes para usuario:', userId);
      solicitudes = await solicitudesService.obtenerSolicitudesPorUsuario(userId);
    }
    
    console.log('obtenerSolicitudes: Solicitudes encontradas:', solicitudes.length);
    res.json({ success: true, data: solicitudes });
  } catch (error) {
    console.error('obtenerSolicitudes: Error:', error);
    next(error);
  }
}

export async function obtenerSolicitudesPorUsuario(
  req: Request,
  res: Response<SolicitudResponse | { message: string }>,
  next: NextFunction
) {
  try {
    const idUsuario = parseInt(req.params.idUsuario);
    if (isNaN(idUsuario)) {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }

    const solicitudes = await solicitudesService.obtenerSolicitudesPorUsuario(idUsuario);
    res.json({ success: true, data: solicitudes as any });
  } catch (error) {
    next(error);
  }
}

export async function obtenerSolicitudPorId(
  req: Request,
  res: Response<SolicitudResponse | { message: string }>,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID de solicitud inválido" });
    }

    const solicitud = await solicitudesService.obtenerSolicitudPorId(id);
    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    res.json({ success: true, data: solicitud });
  } catch (error) {
    next(error);
  }
}

export async function crearSolicitud(
  req: Request<{}, {}, CrearSolicitudRequest & { idUsuario?: number }>,
  res: Response<SolicitudResponse | { message: string }>,
  next: NextFunction
) {
  try {
    const idUsuario = req.body.idUsuario || (req as any).user?.id;
    if (!idUsuario) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    const solicitud = await solicitudesService.crearSolicitud(idUsuario, req.body);
    res.status(201).json({ success: true, data: solicitud });
  } catch (error) {
    next(error);
  }
}

export async function actualizarSolicitud(
  req: Request<{ id: string }, {}, ActualizarSolicitudRequest>,
  res: Response<SolicitudResponse | { message: string }>,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID de solicitud inválido" });
    }

    const solicitud = await solicitudesService.actualizarSolicitud(id, req.body);
    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    res.json({ success: true, data: solicitud, message: "Solicitud actualizada exitosamente" });
  } catch (error) {
    next(error);
  }
}

export async function eliminarSolicitud(
  req: Request,
  res: Response<{ success: boolean; message: string }>,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "ID de solicitud inválido" });
    }

    const eliminada = await solicitudesService.eliminarSolicitud(id);
    if (!eliminada) {
      return res.status(404).json({ success: false, message: "Solicitud no encontrada" });
    }

    res.json({ success: true, message: "Solicitud eliminada correctamente" });
  } catch (error) {
    next(error);
  }
}
