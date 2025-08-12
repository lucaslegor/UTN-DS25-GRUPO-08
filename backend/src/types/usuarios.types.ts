export type Rol = "Administrador" | "Usuario" ;

export interface Usuario {
  idUsuario: number;
  username: string;
  passwordHash: string;  // nunca exponer
  rol: Rol;
  createdAt: Date;
}

export interface UsuarioPublic {
  idUsuario: number;
  username: string;
  rol: Rol;
  createdAt: Date;
}

// Auth
export interface LoginRequest { username: string; password: string; }
export interface LoginResponse { token: string; user: UsuarioPublic; }

export interface RegisterRequest { username: string; password: string; rol?: Rol; }
export interface RegisterResponse { user: UsuarioPublic | null; message: string; }

// Administrador
export interface AdminProfile {
  idAdmin: number;
  idUsuario: number;   // relación con la cuenta base de Usuario
  nombre: string;
  email: string;
  telefono?: string;
  activo: boolean;     // si sigue con privilegios de admin
  createdAt: Date;
}

