import { Poliza, EstadoPoliza, CargarPolizaRequest } from '../types/poliza.types';

// Datos en memoria (MVP)
let polizas: Poliza[] = [];
let lastId = 0;

// GET all
export async function getAllPolizas(): Promise<Poliza[]> {
  return polizas;
}

// GET by id
export async function getPolizaById(id: number): Promise<Poliza | null> {
  return polizas.find(p => p.idPoliza === id) || null;
}

// CREATE
export async function createPoliza(idPedido: number, data: CargarPolizaRequest): Promise<Poliza> {
  if (!data.archivoUrl) {
    const e: any = new Error("La póliza debe contener una URL de archivo");
    e.statusCode = 400;
    throw e;
  }

  const now = new Date();
  const newPoliza: Poliza = {
    idPoliza: ++lastId,
    idPedido,
    archivoUrl: data.archivoUrl,
    estado: 'PENDIENTE',
    createdAt: now,
    updatedAt: now,
  };

  polizas.push(newPoliza);
  return newPoliza;
}

// UPDATE estado o archivo
export async function updatePoliza(id: number, data: Partial<Poliza>): Promise<Poliza> {
  const index = polizas.findIndex(p => p.idPoliza === id);
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
  const index = polizas.findIndex(p => p.idPoliza === id);
  if (index === -1) return null;

  const [removed] = polizas.splice(index, 1);
  return removed;
}
