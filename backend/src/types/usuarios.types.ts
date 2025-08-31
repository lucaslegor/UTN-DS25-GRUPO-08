export type Rol = "Administrador" | "Usuario";

export interface Usuario {
  idUsuario: number;
  username: string;
  mail: string;        
  passwordHash: string; // nunca exponer
  rol: Rol;
  createdAt: Date;
}

export interface UsuarioPublic {
  idUsuario: number;
  username: string;
  mail: string;        
  rol: Rol;
  createdAt: Date;
}

// Auth
export interface LoginRequest { username: string; password: string; }
export interface LoginResponse { token: string; user: UsuarioPublic; }

export interface RegisterRequest { username: string; mail: string; password: string; rol?: Rol; }
export interface RegisterResponse { user: UsuarioPublic | null; message: string; }

// Admin profile
export interface AdminProfile {
  idAdmin: number;
  idUsuario: number;
  nombre: string;
  telefono?: string;
  activo: boolean;
  createdAt: Date;
}
