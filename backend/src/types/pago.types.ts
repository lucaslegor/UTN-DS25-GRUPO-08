export type PasarelaPago = "MERCADOPAGO";

export type EstadoPago =
  | "CREADO"       // intención creada
  | "PENDIENTE"    // esperando confirmación
  | "APROBADO"
  | "RECHAZADO"
  | "CANCELADO";

export interface Pago {
  idPago: number;
  idPedido: number;
  pasarela: PasarelaPago;
  estado: EstadoPago;
  monto: number;
  moneda: 'ARS';
  // Identificadores por pasarela
  preferenceId?: string;  // Mercado Pago
  initPoint?: string;     // MP checkout URL
  createdAt: Date;
  updatedAt: Date;
}

export interface CrearPagoRequest {
  idPedido: number;
  pasarela: PasarelaPago;
}

export interface CrearPagoResponse {
  pago: Pago;
  // Links/IDs para redirigir al checkout
  initPoint?: string;
  checkoutUrl?: string;
  message?: string;
}

export interface WebhookMercadoPago {
  id: string;          // payment id
  type: "payment";
  action: string;
  date_created: string;
  data: { id: string };
}


