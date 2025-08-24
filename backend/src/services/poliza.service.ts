import prisma from '../config/prisma';
import { Poliza, EstadoPoliza, CargarPolizaRequest } from '../types/poliza.types';

// Datos en memoria (MVP)
let polizas: Poliza[] = [];
let lastId = 0;

// GET all
export async function getAllPolizas(): Promise<Poliza[]> {
  const polizas = await prisma.poliza.findMany({
   orderBy: { id: 'asc' },
 });
 // Prisma ya devuelve objetos con las mismas claves del modelo
   return polizas;
}

// GET by id
export async function getPolizaById(id: number): Promise<Poliza | null> {
  const poliza = await prisma.poliza.findUnique({where: {id}})
  if (!poliza) {
  const error = new Error('Book not found');
  (error as any).statusCode = 404;
  throw error;
  }
  return poliza;
}

// CREATE
export async function createPoliza(idPedido: number, data: CargarPolizaRequest): Promise<Poliza> {
  if (!data.archivoUrl) {
    const error: any = new Error("La póliza debe contener una URL de archivo");
    error.statusCode = 400;
    throw error;
  }

  try {
    const row = await prisma.poliza.create({
      data: {
        idPedido,                 
        archivoUrl: data.archivoUrl,
        estado: "PENDIENTE",      
      },
    });

    return {
      id: row.id,
      idPedido: row.idPedido,
      archivoUrl: row.archivoUrl,
      estado: row.estado,         
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
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

// FALTAN HACER ESTOS
export async function updatePoliza(id: number, data: Partial<Poliza>): Promise<Poliza> {
  const index = polizas.findIndex(p => p.id === id);
  if (index === -1) {
    const error: any = new Error('Póliza no encontrada');
    error.statusCode = 404;
    throw error;
  }

  polizas[index] = {
    ...polizas[index],
    ...data,
    updatedAt: new Date(),
  };

  return polizas[index];
}

// DELETE
export async function deletePoliza(id: number): Promise<Poliza | null> {
  const index = polizas.findIndex(p => p.id === id);
  if (index === -1) return null;

  const [removed] = polizas.splice(index, 1);
  return removed;
}
