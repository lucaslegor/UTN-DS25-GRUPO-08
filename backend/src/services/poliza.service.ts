import prisma from '../config/prisma';
import { 
  Poliza, 
  EstadoPoliza, 
  CrearPolizaRequest, 
  ActualizarPolizaRequest
} from '../types/poliza.types';

// GET all
export async function getAllPolizas(): Promise<Poliza[]> {
  return await prisma.poliza.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      solicitud: {
        include: {
          items: true,
        },
      },
    },
  });
}

// GET by id
export async function getPolizaById(id: number): Promise<Poliza | null> {
  return await prisma.poliza.findUnique({
    where: { id },
    include: {
      solicitud: {
        include: {
          items: true,
        },
      },
    },
  });
}

// GET by solicitud ID
export async function getPolizaBySolicitudId(idSolicitud: number): Promise<Poliza | null> {
  return await prisma.poliza.findUnique({
    where: { idSolicitud },
    include: {
      solicitud: {
        include: {
          items: true,
        },
      },
    },
  });
}

// CREATE OR UPDATE
export async function createPoliza(idSolicitud: number, data: CrearPolizaRequest): Promise<Poliza> {
  if (!data.archivoUrl) {
    const error: any = new Error("La póliza debe contener una URL de archivo");
    error.statusCode = 400;
    throw error;
  }

  try {
    // Verificar que la solicitud existe
    const solicitud = await prisma.solicitud.findUnique({
      where: { id: idSolicitud }
    });

    if (!solicitud) {
      const error: any = new Error("La solicitud no existe");
      error.statusCode = 404;
      throw error;
    }

    const estadoInicial: EstadoPoliza = "CARGADA";
    
    // Usar transacción para crear o actualizar la póliza
    const result = await prisma.$transaction(async (tx) => {
      // Verificar si ya existe una póliza para esta solicitud
      const polizaExistente = await tx.poliza.findUnique({
        where: { idSolicitud }
      });

      let poliza;
      if (polizaExistente) {
        // Actualizar póliza existente
        poliza = await tx.poliza.update({
          where: { id: polizaExistente.id },
          data: {
            archivoUrl: data.archivoUrl,
            estado: estadoInicial,
            updatedAt: new Date()
          },
          include: {
            solicitud: {
              include: {
                items: true,
              },
            },
          },
        });
      } else {
        // Crear nueva póliza
        poliza = await tx.poliza.create({
          data: {
            idSolicitud,
            archivoUrl: data.archivoUrl,
            estado: estadoInicial
          },
          include: {
            solicitud: {
              include: {
                items: true,
              },
            },
          },
        });
      }

      // Actualizar el estado de la solicitud a POLIZA_CARGADA
      await tx.solicitud.update({
        where: { id: idSolicitud },
        data: { estado: "POLIZA_CARGADA" }
      });

      return poliza;
    });

    return result;
  } catch (err: any) {
    if (err.code === "P2003") { 
      const e: any = new Error("La solicitud no existe (violación de clave foránea)");
      e.statusCode = 400;
      throw e;
    }
    throw err;
  }
}

// UPDATE
export async function updatePoliza(id: number, data: ActualizarPolizaRequest): Promise<Poliza> {
  try {
    const poliza = await prisma.poliza.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      },
      include: {
        solicitud: {
          include: {
            items: true,
          },
        },
      },
    });

    return poliza;
  } catch (err: any) {
    if (err.code === "P2025") {
      const error: any = new Error('Póliza no encontrada');
      error.statusCode = 404;
      throw error;
    }
    throw err;
  }
}

// DELETE
export async function deletePoliza(id: number): Promise<Poliza | null> {
  try {
    const poliza = await prisma.poliza.delete({
      where: { id }
    });
    return poliza;
  } catch (err: any) {
    if (err.code === "P2025") {
      return null; 
    }
    throw err;
  }
}

// FUNCIONES PARA AUTORIZACIÓN

// Función para obtener pólizas filtradas por usuario
export async function getPolizasByUsuario(idUsuario: number): Promise<Poliza[]> {
  return await prisma.poliza.findMany({
    where: {
      solicitud: {
        idUsuario: idUsuario
      }
    },
    include: {
      solicitud: {
        include: {
          items: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' }
  });
}

// Función para obtener póliza con verificación de ownership
export async function getPolizaByIdConOwnership(id: number, idUsuario: number): Promise<Poliza | null> {
  const poliza = await prisma.poliza.findFirst({
    where: {
      id: id,
      solicitud: {
        idUsuario: idUsuario
      }
    }
  });
  return poliza;
}

// Función para verificar si una solicitud pertenece a un usuario
export async function verificarOwnershipSolicitud(idSolicitud: number, idUsuario: number): Promise<boolean> {
  const solicitud = await prisma.solicitud.findFirst({
    where: {
      id: idSolicitud,
      idUsuario: idUsuario
    }
  });
  return !!solicitud;
}