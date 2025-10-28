// ==========================================
// backend/src/services/poliza.service.ts
// ==========================================
import { PrismaClient as PrismaClient2 } from '@prisma/client';
import { enviarNotificacionPolizaCargada } from './email.service'

const prisma2 = new PrismaClient2();

export async function getAllPolizas() {
  return await prisma2.poliza.findMany({
    include: {
      solicitud: {
        include: {
          usuario: {
            select: {
              id: true,
              username: true,
              mail: true
            }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
}

export async function getPolizasByUsuario(idUsuario: number) {
  return await prisma2.poliza.findMany({
    where: {
      solicitud: {
        idUsuario
      }
    },
    include: {
      solicitud: {
        include: {
          usuario: {
            select: {
              id: true,
              username: true,
              mail: true
            }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
}

export async function getPolizaById(id: number) {
  return await prisma2.poliza.findUnique({
    where: { id },
    include: {
      solicitud: {
        include: {
          usuario: {
            select: {
              id: true,
              username: true,
              mail: true
            }
          }
        }
      }
    }
  });
}

export async function getPolizaByIdConOwnership(id: number, idUsuario: number) {
  return await prisma2.poliza.findFirst({
    where: {
      id,
      solicitud: {
        idUsuario
      }
    },
    include: {
      solicitud: {
        include: {
          usuario: {
            select: {
              id: true,
              username: true,
              mail: true
            }
          }
        }
      }
    }
  });
}

export async function verificarOwnershipSolicitud(idSolicitud: number, idUsuario: number) {
  const solicitud = await prisma2.solicitud.findFirst({
    where: {
      id: idSolicitud,
      idUsuario
    }
  });
  return !!solicitud;
}

export async function createPoliza(idSolicitud: number, data: { archivoUrl: string }) {
  const solicitud = await prisma2.solicitud.findUnique({
    where: { id: idSolicitud },
    include: { 
      usuario: { 
        select: { mail: true, username: true } 
      } 
    },
  });

  if (!solicitud) {
    const error: any = new Error('Solicitud no encontrada');
    error.statusCode = 404;
    throw error;
  }

  const poliza = await prisma2.poliza.create({
    data: {
      idSolicitud,
      archivoUrl: data.archivoUrl,
      estado: 'CARGADA',
    },
  });

  // Actualizar estado de la solicitud
  await prisma2.solicitud.update({
    where: { id: idSolicitud },
    data: { estado: 'POLIZA_CARGADA' }
  });

  // Enviar notificación
  if (solicitud.usuario?.mail && solicitud.usuario?.username) {
    try {
      await enviarNotificacionPolizaCargada(
        solicitud.usuario.mail,
        solicitud.usuario.username,
        String(poliza.id)
      );
    } catch (error) {
      console.error('Error enviando email de póliza cargada:', error);
    }
  }

  return poliza;
}

export async function updatePoliza(id: number, data: any) {
  try {
    const updated = await prisma2.poliza.update({
      where: { id },
      data,
      include: {
        solicitud: {
          include: {
            usuario: {
              select: {
                id: true,
                username: true,
                mail: true
              }
            }
          }
        }
      }
    });
    return updated;
  } catch (error: any) {
    if (error?.code === 'P2025') {
      const err: any = new Error('Póliza no encontrada');
      err.statusCode = 404;
      throw err;
    }
    throw error;
  }
}

export async function deletePoliza(id: number) {
  try {
    return await prisma2.poliza.delete({
      where: { id }
    });
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return null;
    }
    throw error;
  }
}

// Función legacy - mantener por compatibilidad
export async function cargarPoliza(idSolicitud: number, archivoUrl: string) {
  return await createPoliza(idSolicitud, { archivoUrl });
}