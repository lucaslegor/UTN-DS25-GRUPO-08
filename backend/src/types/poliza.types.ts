export type EstadoPoliza = "PENDIENTE" | "CARGADA";

export interface Poliza {
  id: number;
  idPedido: number;       // vinculación al pedido/venta
  archivoUrl: string;     // URL pública del PDF subido
  estado: EstadoPoliza;   // si está pendiente o ya cargada
  createdAt: Date;
  updatedAt: Date;
}

export interface CrearPolizaRequest {
  archivoUrl: string;
}

export interface CrearPolizaResponse {
  poliza: Poliza;
  message: string;
}

export interface ObtenerPolizaResponse {
  poliza: Poliza | null;
  message?: string;
}

export interface ActualizarPolizaRequest {
  archivoUrl?: string;
  estado?: EstadoPoliza;
}