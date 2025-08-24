import { Pago, CrearPagoRequest, CrearPagoResponse, UpdatePagoRequest, UpdatePagoEstadoRequest } from "../types/pago.types";

const mockPagos: Pago[] = [
  {
    idPago: 1,
    idPedido: 1,
    pasarela: "MERCADOPAGO",
    estado: "APROBADO",
    monto: 15000,
    moneda: 'ARS',
    preferenceId: "pref_123456789",
    initPoint: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=pref_123456789",
    createdAt: new Date("2025-01-15T10:00:00Z"),
    updatedAt: new Date("2025-01-15T10:30:00Z"),
  },
  {
    idPago: 2,
    idPedido: 2,
    pasarela: "MERCADOPAGO",
    estado: "PENDIENTE",
    monto: 8000,
    moneda: 'ARS',
    preferenceId: "pref_987654321",
    initPoint: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=pref_987654321",
    createdAt: new Date("2025-02-01T15:30:00Z"),
    updatedAt: new Date("2025-02-01T15:30:00Z"),
  },
  {
    idPago: 3,
    idPedido: 3,
    pasarela: "MERCADOPAGO",
    estado: "CREADO",
    monto: 12000,
    moneda: 'ARS',
    preferenceId: "pref_456789123",
    initPoint: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=pref_456789123",
    createdAt: new Date("2025-02-10T09:15:00Z"),
    updatedAt: new Date("2025-02-10T09:15:00Z"),
  },
  {
    idPago: 4,
    idPedido: 4,
    pasarela: "MERCADOPAGO",
    estado: "RECHAZADO",
    monto: 20000,
    moneda: 'ARS',
    preferenceId: "pref_789123456",
    initPoint: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=pref_789123456",
    createdAt: new Date("2025-03-05T18:00:00Z"),
    updatedAt: new Date("2025-03-05T18:15:00Z"),
  },
  {
    idPago: 5,
    idPedido: 5,
    pasarela: "MERCADOPAGO",
    estado: "CANCELADO",
    monto: 5000,
    moneda: 'ARS',
    preferenceId: "pref_321654987",
    initPoint: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=pref_321654987",
    createdAt: new Date("2025-04-20T12:45:00Z"),
    updatedAt: new Date("2025-04-20T13:00:00Z"),
  },
];

export const getAllPagos = async(): Promise<Pago[]> => {
    return mockPagos;
}

export const getPagoById = async(id: number): Promise<Pago | null> => {
    const pago = mockPagos.find( p => p.idPago === id);
    if(pago === undefined){
        const error = new Error('Pago no encontrado');
        (error as any).statusCode = 404;
        throw error;
    }
    return pago;
}

export const getPagosByPedido = async(idPedido: number): Promise<Pago[]> => {
    return mockPagos.filter( p => p.idPedido === idPedido);
}

export const createPago = async(pagoData: CrearPagoRequest): Promise<Pago> => {
    if(pagoData.idPedido <= 0){
        const error = new Error('El ID del pedido debe ser válido');
        (error as any).statusCode = 400;
        throw error;
    }

    const pago: Pago = { 
        idPago: mockPagos.length ? Math.max(...mockPagos.map( i => i.idPago)) + 1: 1,
        ...pagoData,
        estado: "CREADO",
        monto: 0, // Se calculará basado en el pedido
        moneda: 'ARS',
        createdAt: new Date(),
        updatedAt: new Date()
    }
    mockPagos.push(pago);
    return pago;
}

export const updatePagoEstado = async(id: number, estadoData: UpdatePagoEstadoRequest): Promise<Pago | null> => {
    const pagoIndex = mockPagos.findIndex( p => p.idPago === id);
    if(pagoIndex === -1){
        const error = new Error('Pago no encontrado');
        (error as any).statusCode = 404;
        throw error;
    }

    // Validar que el estado sea válido
    const estadosValidos = ["CREADO", "PENDIENTE", "APROBADO", "RECHAZADO", "CANCELADO"];
    if(!estadosValidos.includes(estadoData.estado)){
        const error = new Error('Estado de pago inválido');
        (error as any).statusCode = 400;
        throw error;
    }

    mockPagos[pagoIndex] = {
        ...mockPagos[pagoIndex], 
        estado: estadoData.estado,
        updatedAt: new Date()
    };
    return mockPagos[pagoIndex];
}

export const updatePago = async(id: number, pagoData: UpdatePagoRequest): Promise<Pago | null> => {
    const pagoIndex = mockPagos.findIndex( p => p.idPago === id);
    if(pagoIndex === -1){
        const error = new Error('Pago no encontrado');
        (error as any).statusCode = 404;
        throw error;
    }

    if(pagoData.monto !== undefined && pagoData.monto <= 0){
        const error = new Error('El monto debe ser mayor a 0');
        (error as any).statusCode = 400;
        throw error;
    }

    mockPagos[pagoIndex] = {
        ...mockPagos[pagoIndex], 
        ...pagoData,
        updatedAt: new Date()
    };
    return mockPagos[pagoIndex];
}

export const deletePago = async(id: number): Promise<Pago> => {
    const pagoIndex = mockPagos.findIndex( p => p.idPago === id);
    if(pagoIndex === -1){
        const error = new Error('Pago no encontrado');
        (error as any).statusCode = 404;
        throw error;
    }
    const [pago] = mockPagos.splice(pagoIndex,1);
    return pago;
}

export const procesarWebhookMercadoPago = async(webhookData: any): Promise<void> => {
    // Simular procesamiento de webhook
    console.log('Procesando webhook de Mercado Pago:', webhookData);
    
    // Aquí se actualizaría el estado del pago basado en la respuesta de MP
    // Por ahora solo es un mock
}
