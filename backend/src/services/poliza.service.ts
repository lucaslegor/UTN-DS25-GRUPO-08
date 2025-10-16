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
      pedido: {
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
      pedido: {
        include: {
          items: true,
        },
      },
    },
  });
}

// GET by pedido ID
export async function getPolizaByPedidoId(idPedido: number): Promise<Poliza | null> {
  return await prisma.poliza.findUnique({
    where: { idPedido },
    include: {
      pedido: {
        include: {
          items: true,
        },
      },
    },
  });
}

// CREATE OR UPDATE
export async function createPoliza(idPedido: number, data: CrearPolizaRequest): Promise<Poliza> {
  if (!data.archivoUrl) {
    const error: any = new Error("La póliza debe contener una URL de archivo");
    error.statusCode = 400;
    throw error;
  }

  try {
    // Verificar que el pedido existe
    const pedido = await prisma.pedido.findUnique({
      where: { id: idPedido }
    });

    if (!pedido) {
      const error: any = new Error("El pedido no existe");
      error.statusCode = 404;
      throw error;
    }

    const estadoInicial: EstadoPoliza = "CARGADA";
    
    // Usar transacción para crear o actualizar la póliza
    const result = await prisma.$transaction(async (tx) => {
      // Verificar si ya existe una póliza para este pedido
      const polizaExistente = await tx.poliza.findUnique({
        where: { idPedido }
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
            pedido: {
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
            idPedido,
            archivoUrl: data.archivoUrl,
            estado: estadoInicial
          },
          include: {
            pedido: {
              include: {
                items: true,
              },
            },
          },
        });
      }

      // Actualizar el estado del pedido a POLIZA_CARGADA
      await tx.pedido.update({
        where: { id: idPedido },
        data: { estado: "POLIZA_CARGADA" }
      });

      return poliza;
    });

    return result;
  } catch (err: any) {
    if (err.code === "P2003") { 
      const e: any = new Error("El pedido no existe (violación de clave foránea)");
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
      }
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
      pedido: {
        idUsuario: idUsuario
      }
    },
    include: {
      pedido: {
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
      pedido: {
        idUsuario: idUsuario
      }
    }
  });
  return poliza;
}

// Función para verificar si un pedido pertenece a un usuario
export async function verificarOwnershipPedido(idPedido: number, idUsuario: number): Promise<boolean> {
  const pedido = await prisma.pedido.findFirst({
    where: {
      id: idPedido,
      idUsuario: idUsuario
    }
  });
  return !!pedido;
}