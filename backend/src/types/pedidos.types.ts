import { Poliza } from "./poliza.types";

export type EstadoPedido =
  | "CREADO"            
  | "PENDIENTE_POLIZA"       
  | "POLIZA_CARGADA"    
  | "PAGO_PENDIENTE"    
  | "PAGO_APROBADO"
  | "PAGO_RECHAZADO"
  | "CANCELADO";


export interface PedidoItem {
  productId: number;
  titulo: string;
  precio: number;
  cantidad: number; 
}

export interface Pedido {
  idPedido: number;
  idUsuario: number;         
  items: PedidoItem[];
  subtotal: number;
  total: number;
  moneda: 'ARS';
  estado: EstadoPedido;
  poliza?: Poliza;           
  createdAt: Date;
  updatedAt: Date;
}

export interface CrearPedidoRequest {
  items: { productId: number; cantidad?: number }[];
  moneda: 'ARS';
}

export interface PedidoResponse {
  pedido: Pedido;
  message?: string;
}

export interface PedidosListResponse {
  pedidos: Pedido[];
  total: number;
}
