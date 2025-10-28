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
    
    console.log('=== OBTENER SOLICITUDES ===');
    console.log('obtenerSolicitudes: userId:', userId, 'role:', role);
    console.log('obtenerSolicitudes: user object completo:', (req as any).user);
    
    if (!userId) {
      console.log('obtenerSolicitudes: ERROR - Usuario no autenticado');
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
      console.log('obtenerSolicitudes: Solicitudes del usuario:', solicitudes);
    }
    
    console.log('obtenerSolicitudes: Solicitudes encontradas:', solicitudes.length);
    console.log('obtenerSolicitudes: Primera solicitud:', solicitudes[0]);
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

    // Adaptar el tipo para que coincida con la interfaz Solicitud
    const solicitudFixed = {
      ...solicitud,
      poliza: solicitud.poliza === null ? undefined : {
        id: solicitud.poliza.id,
        archivoUrl: solicitud.poliza.archivoUrl,
        estado: solicitud.poliza.estado as "PENDIENTE" | "CARGADA",
        createdAt: solicitud.poliza.createdAt,
        updatedAt: solicitud.poliza.updatedAt,
      },
      datosPersonales: solicitud.datosPersonales as any, // Cast para manejar JsonValue
      notaRechazo: solicitud.notaRechazo || undefined,
    } as any;

    res.json({ success: true, data: solicitudFixed });
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
    
    // Adaptar el tipo para que coincida con la interfaz Solicitud
    const solicitudFixed = {
      ...solicitud,
      poliza: solicitud.poliza === null ? undefined : {
        id: solicitud.poliza.id,
        archivoUrl: solicitud.poliza.archivoUrl,
        estado: solicitud.poliza.estado as "PENDIENTE" | "CARGADA",
        createdAt: solicitud.poliza.createdAt,
        updatedAt: solicitud.poliza.updatedAt,
      },
      datosPersonales: solicitud.datosPersonales as any, // Cast para manejar JsonValue
      notaRechazo: solicitud.notaRechazo || undefined,
    } as any;
    
    res.status(201).json({ success: true, data: solicitudFixed });
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

    // Adaptar el tipo para que coincida con la interfaz Solicitud
    const solicitudFixed = {
      ...solicitud,
      poliza: solicitud.poliza === null ? undefined : {
        id: solicitud.poliza.id,
        archivoUrl: solicitud.poliza.archivoUrl,
        estado: solicitud.poliza.estado as "PENDIENTE" | "CARGADA",
        createdAt: solicitud.poliza.createdAt,
        updatedAt: solicitud.poliza.updatedAt,
      },
      datosPersonales: solicitud.datosPersonales as any, // Cast para manejar JsonValue
      notaRechazo: solicitud.notaRechazo || undefined,
    } as any;

    res.json({ success: true, data: solicitudFixed, message: "Solicitud actualizada exitosamente" });
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
