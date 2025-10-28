
// ==========================================
// backend/src/services/solicitudes.service.ts
// ==========================================
import { PrismaClient } from '@prisma/client';
import { enviarNotificacionSolicitud } from './email.service';
import { EstadoSolicitud } from '../types/solicitudes.types';

const prisma = new PrismaClient();

export async function getAllSolicitudes() {
  return await prisma.solicitud.findMany({
    include: {
      items: true,
      poliza: true,
      usuario: {
        select: {
          id: true,
          username: true,
          mail: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
}

export async function obtenerSolicitudesPorUsuario(idUsuario: number) {
  return await prisma.solicitud.findMany({
    where: { idUsuario },
    include: {
      items: true,
      poliza: true,
      usuario: {
        select: {
          id: true,
          username: true,
          mail: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
}

export async function obtenerSolicitudPorId(id: number) {
  return await prisma.solicitud.findUnique({
    where: { id },
    include: {
      items: true,
      poliza: true,
      usuario: {
        select: {
          id: true,
          username: true,
          mail: true
        }
      }
    }
  });
}

export async function crearSolicitud(idUsuario: number, datos: any) {
  const solicitud = await prisma.solicitud.create({
    data: {
      idUsuario,
      estado: 'CREADA',
      datosPersonales: datos.datosPersonales,
      items: { create: datos.items },
    },
    include: { 
      usuario: { 
        select: { mail: true, username: true } 
      } 
    },
    include: { usuario: { select: { mail: true, username: true } } },
  });

  // Notificamos al cliente y al equipo
  if (solicitud.usuario?.mail && solicitud.usuario?.username) {
    try {
      await enviarNotificacionSolicitud(
        solicitud.usuario.mail,
        solicitud.usuario.username,
        String(solicitud.id),
        'CREADA'
      );
    } catch (error) {
      console.error('Error enviando email de notificación:', error);
      // No lanzamos el error para no bloquear la creación de la solicitud
    }
  }

  return solicitud;
}

export async function actualizarSolicitud(idSolicitud: number, datos: any) {
  const updateData: any = {};
  
  if (datos.estado) {
    updateData.estado = datos.estado;
  }
  
  if (datos.datosPersonales) {
    updateData.datosPersonales = datos.datosPersonales;
  }
  
  if (datos.notaRechazo !== undefined) {
    updateData.notaRechazo = datos.notaRechazo;
  }

  const updatedSolicitud = await prisma.solicitud.update({
    where: { id: idSolicitud },
    data: updateData,
    include: { 
      usuario: { 
        select: { mail: true, username: true } 
      } 
    },
  });

  // Notificamos solo si cambió el estado
  if (datos.estado && updatedSolicitud.usuario?.mail && updatedSolicitud.usuario?.username) {
    try {
      await enviarNotificacionSolicitud(
        updatedSolicitud.usuario.mail,
        updatedSolicitud.usuario.username,
        String(updatedSolicitud.id),
        datos.estado
      );
    } catch (error) {
      console.error('Error enviando email de notificación:', error);
    }
  }

  return updatedSolicitud;
}

export async function eliminarSolicitud(id: number) {
  try {
    await prisma.solicitud.delete({
      where: { id }
    });
    return true;
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return false; // No encontrado
    }
    throw error;
  }
}
