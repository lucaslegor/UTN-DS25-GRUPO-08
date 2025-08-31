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
    orderBy: { createdAt: 'desc' }
  });
}

// GET by id
export async function getPolizaById(id: number): Promise<Poliza | null> {
  return await prisma.poliza.findUnique({
    where: { id }
  });
}

// GET by pedido ID
export async function getPolizaByPedidoId(idPedido: number): Promise<Poliza | null> {
  return await prisma.poliza.findUnique({
    where: { idPedido }
  });
}

// CREATE
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

    const estadoInicial: EstadoPoliza = "PENDIENTE";
    
    const poliza = await prisma.poliza.create({
      data: {
        idPedido,
        archivoUrl: data.archivoUrl,
        estado: estadoInicial
      }
    });

    return poliza;
  } catch (err: any) {
    // Manejo de errores comunes
    if (err.code === "P2003") { // FK violation: Pedido inexistente
      const e: any = new Error("El pedido no existe (violación de clave foránea)");
      e.statusCode = 400;
      throw e;
    }
    if (err.code === "P2002") {
      const e: any = new Error("Ya existe una póliza para este pedido");
      e.statusCode = 409;
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
      return null; // Póliza no encontrada
    }
    throw err;
  }
}
