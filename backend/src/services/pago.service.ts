// src/services/pago.service.ts
import {
  Pago,
  CrearPagoRequest,
  CrearPagoResponse,
  UpdatePagoRequest,
  UpdatePagoEstadoRequest,
} from "../types/pago.types";
import prisma from "../config/prisma";

const mockPagos: Pago[] = [
  {
    idPago: 1,
    idPedido: 1,
    pasarela: "MERCADOPAGO",
    estado: "APROBADO",
    monto: 15000,
    moneda: "ARS",
    preferenceId: "pref_123456789",
    initPoint:
      "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=pref_123456789",
    createdAt: new Date("2025-01-15T10:00:00Z"),
    updatedAt: new Date("2025-01-15T10:30:00Z"),
  },
  {
    idPago: 2,
    idPedido: 2,
    pasarela: "MERCADOPAGO",
    estado: "PENDIENTE",
    monto: 8000,
    moneda: "ARS",
    preferenceId: "pref_987654321",
    initPoint:
      "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=pref_987654321",
    createdAt: new Date("2025-02-01T15:30:00Z"),
    updatedAt: new Date("2025-02-01T15:30:00Z"),
  },
  {
    idPago: 3,
    idPedido: 3,
    pasarela: "MERCADOPAGO",
    estado: "CREADO",
    monto: 12000,
    moneda: "ARS",
    preferenceId: "pref_456789123",
    initPoint:
      "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=pref_456789123",
    createdAt: new Date("2025-02-10T09:15:00Z"),
    updatedAt: new Date("2025-02-10T09:15:00Z"),
  },
  {
    idPago: 4,
    idPedido: 4,
    pasarela: "MERCADOPAGO",
    estado: "RECHAZADO",
    monto: 20000,
    moneda: "ARS",
    preferenceId: "pref_789123456",
    initPoint:
      "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=pref_789123456",
    createdAt: new Date("2025-03-05T18:00:00Z"),
    updatedAt: new Date("2025-03-05T18:15:00Z"),
  },
  {
    idPago: 5,
    idPedido: 5,
    pasarela: "MERCADOPAGO",
    estado: "CANCELADO",
    monto: 5000,
    moneda: "ARS",
    preferenceId: "pref_321654987",
    initPoint:
      "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=pref_321654987",
    createdAt: new Date("2025-04-20T12:45:00Z"),
    updatedAt: new Date("2025-04-20T13:00:00Z"),
  },
];

// DB -> DTO
function toPagoDTO(row: any): Pago {
  return {
    idPago: row.id,
    idPedido: row.idPedido,
    pasarela: row.pasarela, 
    estado: row.estado, 
    monto: Number(row.monto),
    moneda: row.moneda, 
    preferenceId: undefined,
    initPoint: undefined,
    createdAt: row.createdAt,
    updatedAt: (row as any).updatedAt ?? row.createdAt,
  };
}

export const getAllPagos = async (): Promise<Pago[]> => {
  const rows = await prisma.pago.findMany({ orderBy: { id: "asc" } });
  return rows.map(toPagoDTO);
};

export const getPagoById = async (id: number): Promise<Pago | null> => {
  const row = await prisma.pago.findUnique({ where: { id } });
  if (!row) {
    const error = new Error("Pago no encontrado");
    (error as any).statusCode = 404;
    throw error;
  }
  return toPagoDTO(row);
};

export const getPagosByPedido = async (idPedido: number): Promise<Pago[]> => {
  const rows = await prisma.pago.findMany({
    where: { idPedido },
    orderBy: { id: "asc" },
  });
  return rows.map(toPagoDTO);
};

export const createPago = async (pagoData: CrearPagoRequest): Promise<Pago> => {
  if (pagoData.idPedido <= 0) {
    const error = new Error("El ID del pedido debe ser válido");
    (error as any).statusCode = 400;
    throw error;
  }

  const created = await prisma.pago.create({
    data: {
      idPedido: pagoData.idPedido,
      pasarela: pagoData.pasarela as any, 
      estado: "CREADO",
      monto: 0, 
      moneda: "ARS",
    },
  });

  return { ...toPagoDTO(created), updatedAt: new Date() };
};

export const updatePagoEstado = async (
  id: number,
  estadoData: UpdatePagoEstadoRequest
): Promise<Pago | null> => {
  const row = await prisma.pago.findUnique({ where: { id } });
  if (!row) {
    const error = new Error("Pago no encontrado");
    (error as any).statusCode = 404;
    throw error;
  }

  const estadosValidos = [
    "CREADO",
    "PENDIENTE",
    "APROBADO",
    "RECHAZADO",
    "CANCELADO",
  ] as const;
  if (!estadosValidos.includes(estadoData.estado as any)) {
    const error = new Error("Estado de pago inválido");
    (error as any).statusCode = 400;
    throw error;
  }

  const updated = await prisma.pago.update({
    where: { id },
    data: { estado: estadoData.estado as any },
  });

  return { ...toPagoDTO(updated), updatedAt: new Date() };
};

export const updatePago = async (
  id: number,
  pagoData: UpdatePagoRequest
): Promise<Pago | null> => {
  const row = await prisma.pago.findUnique({ where: { id } });
  if (!row) {
    const error = new Error("Pago no encontrado");
    (error as any).statusCode = 404;
    throw error;
  }

  if (pagoData.monto !== undefined && pagoData.monto <= 0) {
    const error = new Error("El monto debe ser mayor a 0");
    (error as any).statusCode = 400;
    throw error;
  }

  const payload: any = {};
if (pagoData.estado) {
  payload.estado = pagoData.estado; 
}

if (typeof pagoData.monto === "number") {
  if (pagoData.monto <= 0) {
    const error = new Error("El monto debe ser mayor a 0");
    (error as any).statusCode = 400;
    throw error;
  }
  payload.monto = pagoData.monto; 
}

const updated = await prisma.pago.update({
  where: { id },
  data: payload,
});

return { ...toPagoDTO(updated), updatedAt: new Date() };
};

export const procesarWebhookMercadoPago = async (
  webhookData: any
): Promise<void> => {
  console.log("Procesando webhook de Mercado Pago:", webhookData);
};
