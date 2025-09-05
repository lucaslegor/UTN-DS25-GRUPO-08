export type Rol = "Administrador" | "Usuario";

export interface Usuario {
  idUsuario: number;
  username: string;
  mail: string;
  passwordHash: string;
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

export interface LoginRequest {
  username?: string;
  mail?: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: UsuarioPublic;
}

export interface RegisterRequest {
  username: string;
  mail: string;
  password: string;
  rol?: Rol;
}

export interface RegisterResponse {
  user: UsuarioPublic | null;
  message: string;
}
