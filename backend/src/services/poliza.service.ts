// src/services/poliza.service.ts
import prisma from '../config/prisma';
import { Poliza, EstadoPoliza, CargarPolizaRequest } from '../types/poliza.types';

// GET all
export async function getAllPolizas(): Promise<Poliza[]> {
  const polizas = await prisma.poliza.findMany({
    orderBy: { id: 'asc' },
  });
  return polizas;
}

// GET by id
export async function getPolizaById(id: number): Promise<Poliza | null> {
  const poliza = await prisma.poliza.findUnique({ where: { id } });
  if (!poliza) {
    const error = new Error('Póliza no encontrada');
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

    return row;
  } catch (err: any) {
    if (err.code === "P2003") {
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
export async function updatePoliza(id: number, data: Partial<Poliza>): Promise<Poliza> {
  try {
    const updated = await prisma.poliza.update({
      where: { id },
      data: {
        archivoUrl: data.archivoUrl,
        estado: data.estado,
      },
    });
    return updated;
  } catch (err: any) {
    if (err.code === 'P2025') {
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
    return await prisma.poliza.delete({ where: { id } });
  } catch (err: any) {
    if (err.code === 'P2025') return null;
    throw err;
  }
}
