export type PasarelaPago = "MERCADOPAGO";

export type EstadoPago =
  | "CREADO"       
  | "PENDIENTE"    
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
  preferenceId?: string;  
  initPoint?: string;     
  createdAt: Date;
  updatedAt: Date;
}

export interface CrearPagoRequest {
  idPedido: number;
  pasarela: PasarelaPago;
}

export interface CrearPagoResponse {
  pago: Pago;
  initPoint?: string;
  checkoutUrl?: string;
  message?: string;
}

export interface UpdatePagoRequest {
  estado?: EstadoPago;
  monto?: number;
  preferenceId?: string;
  initPoint?: string;
}

export interface PagoResponse {
  pago: Pago;
  message: string;
}

export interface PagosListResponse {
  pagos: Pago[];
  total: number;
}

export interface UpdatePagoEstadoRequest {
  estado: EstadoPago;
}

export interface WebhookMercadoPago {
  id: string;         
  type: "payment";
  action: string;
  date_created: string;
  data: { id: string };
}


