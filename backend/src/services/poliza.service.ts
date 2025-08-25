import prisma from '../config/prisma';
import type { Poliza as PolizaDTO, CargarPolizaRequest , Poliza } from '../types/poliza.types';
import { EstadoPoliza as PrismaEstadoPoliza } from '../generated/prisma';

// Parseador de tipos (DB -> DTO público)
export function mapRowToPoliza(row: any): Poliza {
  return {
    idPoliza: row.idPoliza ?? row.id,
    idPedido: row.idPedido,
    archivoUrl: row.archivoUrl,
    estado: row.estado, // 'PENDIENTE' | 'APROBADA' | 'RECHAZADA'
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

// GET all
export async function getAllPolizas(): Promise<Poliza[]> {
  const polizas = await prisma.poliza.findMany({
    orderBy: { id: 'asc' },
  });
  return polizas.map(mapRowToPoliza);
}

// GET by id
export async function getPolizaById(id: number): Promise<Poliza | null> {
  const poliza = await prisma.poliza.findUnique({
    where: { id: id },
  });
  return poliza ? mapRowToPoliza(poliza) : null;
}

// CREATE
export async function createPoliza(
  idPedido: number,
  data: CargarPolizaRequest
): Promise<Poliza> {
  // Validaciones de negocio
  if (!Number.isInteger(idPedido) || idPedido <= 0) {
    const error = new Error('idPedido inválido');
    (error as any).statusCode = 400;
    throw error;
  }
  if (!data.archivoUrl) {
    const error = new Error('La póliza debe contener una URL de archivo');
    (error as any).statusCode = 400;
    throw error;
  }

  // Crear (estado por defecto PENDIENTE según schema)
  const created = await prisma.poliza.create({
    data: {
      idPedido,
      archivoUrl: data.archivoUrl,
    },
  });

  return mapRowToPoliza(created);
}

// UPDATE estado o archivo
function toPrismaEstado(estado?: string): PrismaEstadoPoliza | undefined {
  if (estado === undefined) return undefined;
  const key = estado.trim().toUpperCase();
  const valid = Object.values(PrismaEstadoPoliza) as string[];
  if (!valid.includes(key)) {
    const error = new Error('Estado de póliza inválido');
    (error as any).statusCode = 400;
    throw error;
  }
  return key as PrismaEstadoPoliza;
}

type UpdatePolizaRequest = {
  archivoUrl?: string;
  // Permitimos cualquier casing de entrada y lo convertimos arriba
  estado?: string; // o tu tipo DTO si lo tenés exportado; la normalización igual lo mapea
};

export async function updatePoliza(
  id: number,
  updateData: UpdatePolizaRequest
): Promise<PolizaDTO> {
  // Validaciones de negocio
  if (updateData.archivoUrl !== undefined && updateData.archivoUrl.trim() === '') {
    const error = new Error('La póliza debe contener una URL de archivo');
    (error as any).statusCode = 400;
    throw error;
  }

  const estadoPrisma = toPrismaEstado(updateData.estado);

  try {
    const updated = await prisma.poliza.update({
     
      where: { id: id },
      data: {
        ...(updateData.archivoUrl !== undefined ? { archivoUrl: updateData.archivoUrl } : {}),
        ...(estadoPrisma !== undefined ? { estado: estadoPrisma } : {}),
        // updatedAt se maneja con @updatedAt en el schema
      },
    });
    return mapRowToPoliza(updated);
  } catch (e: any) {
    // P2025 = no existe el registro
    if (e.code === 'P2025') {
      const error = new Error('Poliza not found');
      (error as any).statusCode = 404;
      throw error;
    }
    throw e;
  }
}
// DELETE
export async function deletePoliza(id: number): Promise<Poliza | null> {
  try {
    const row = await prisma.poliza.delete({ where: { id: id } });
    return mapRowToPoliza(row);
  } catch (error: any) {
    if (error?.code === 'P2025') return null; // no existía
    throw error;
  }
}
