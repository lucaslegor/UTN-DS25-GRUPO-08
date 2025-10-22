export type EstadoPoliza = "PENDIENTE" | "CARGADA";

export interface Poliza {
  id: number;
  idSolicitud: number;       
  archivoUrl: string;     
  estado: EstadoPoliza;   
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