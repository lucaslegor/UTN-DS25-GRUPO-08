import { PrismaClient } from '@prisma/client';
import { enviarNotificacionSolicitud } from './email.service'; // Importamos la función de notificación
import { EstadoSolicitud } from '../types/solicitudes.types';

const prisma = new PrismaClient();

export async function crearSolicitud(idUsuario: number, datos: any) {
  // Creamos la solicitud
  const solicitud = await prisma.solicitud.create({
    data: {
      idUsuario,
      estado: 'CREADA',
      datosPersonales: datos.datosPersonales,
      items: { create: datos.items },
    },
    include: { usuario: { select: { mail: true, username: true } } },
  });

  // Notificamos al cliente y al equipo
  if (solicitud.usuario?.mail && solicitud.usuario?.username) {
    await enviarNotificacionSolicitud(
      solicitud.usuario.mail,
      solicitud.usuario.username,
      String(solicitud.id),
      'CREADA'
    );
  }

  return solicitud;
}

export async function actualizarSolicitud(idSolicitud: number, estado: EstadoSolicitud) {
  // Actualizamos la solicitud
  const updatedSolicitud = await prisma.solicitud.update({
    where: { id: idSolicitud },
    data: { estado },
    include: { usuario: { select: { mail: true, username: true } } },
  });

  // Notificamos al cliente y al equipo
  if (updatedSolicitud.usuario?.mail && updatedSolicitud.usuario?.username) {
    await enviarNotificacionSolicitud(
      updatedSolicitud.usuario.mail,
      updatedSolicitud.usuario.username,
      String(updatedSolicitud.id),
      estado
    );
  }

  return updatedSolicitud;
}
