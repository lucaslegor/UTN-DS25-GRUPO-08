import { PrismaClient } from '@prisma/client';
import { enviarNotificacionPolizaCargada } from './email.service'; // Importa la función de envío de email

const prisma = new PrismaClient();

export async function cargarPoliza(idSolicitud: number, archivoUrl: string) {
  // Buscamos la solicitud asociada a la póliza
  const solicitud = await prisma.solicitud.findUnique({
    where: { id: idSolicitud },
    include: { usuario: { select: { mail: true, username: true } } },
  });

  if (!solicitud) throw new Error('Solicitud no encontrada');

  // Cargamos la póliza
  const poliza = await prisma.poliza.create({
    data: {
      idSolicitud,
      archivoUrl,
      estado: 'CARGADA',
    },
  });


  if (solicitud.usuario?.mail && solicitud.usuario?.username) {
    await enviarNotificacionPolizaCargada(
      solicitud.usuario.mail,
      solicitud.usuario.username,
      String(poliza.id)
    );
  }

  return poliza;
}
