export type EstadoSolicitud =
  | "CREADA"
  | "PENDIENTE_POLIZA"
  | "POLIZA_CARGADA"
  | "APROBADA"
  | "RECHAZADA"
  | "CANCELADA";

export interface SolicitudItem {
  idProducto: number;
  titulo: string;
  cantidad: number;
}

export interface Solicitud {
  id: number;
  idUsuario: number;
  estado: EstadoSolicitud;
  createdAt: Date;
  updatedAt: Date;
  items: SolicitudItem[];
  poliza?: {
    id: number;
    archivoUrl: string;
    estado: "PENDIENTE" | "CARGADA";
    createdAt: Date;
    updatedAt: Date;
  };
  datosPersonales?: {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    dni: string;
    fechaNacimiento: string;
    direccion: string;
    ciudad: string;
    codigoPostal?: string;
    tipoDocumento: string;
    genero?: string;
    estadoCivil?: string;
    ocupacion?: string;
    ingresosMensuales?: string;
  };
  notaRechazo?: string;
  usuario?: {
    id: number;
    username: string;
    mail: string;
  };
}

export interface CrearSolicitudRequest {
  items: { productId: number; cantidad: number }[];
  datosPersonales?: {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    dni: string;
    fechaNacimiento: string;
    direccion: string;
    ciudad: string;
    codigoPostal?: string;
    tipoDocumento: string;
    genero?: string;
    estadoCivil?: string;
    ocupacion?: string;
    ingresosMensuales?: string;
  };
}

export interface ActualizarSolicitudRequest {
  estado?: EstadoSolicitud;
  items?: { productId: number; cantidad?: number }[];
  datosPersonales?: any;
  notaRechazo?: string;
}

export interface SolicitudResponse {
  success: boolean;
  data?: Solicitud;
  message?: string;
}
