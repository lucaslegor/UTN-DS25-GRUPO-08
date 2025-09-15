import type { Usuario as DomUsuario, Rol } from "../types/usuarios.types";

type PrismaRol = "ADMINISTRADOR" | "USUARIO";

type PrismaUsuarioRow = {
  id: number;
  username: string;
  mail: string;
  passwordHash: string;
  rol: PrismaRol;
  createdAt: Date;
};

/** Prisma -> App */
export const rolFromPrisma = (r: PrismaRol): Rol =>
  r === "ADMINISTRADOR" ? "Administrador" : "Usuario";

/** App -> Prisma */
export const rolToPrisma = (r?: Rol | PrismaRol): PrismaRol =>
  r === "ADMINISTRADOR" || r === "Administrador" ? "ADMINISTRADOR" : "USUARIO";

/** Row de Prisma -> dominio */
export const mapDbToUsuario = (row: PrismaUsuarioRow): DomUsuario => ({
  idUsuario: row.id,
  username: row.username,
  mail: row.mail,
  passwordHash: row.passwordHash,
  rol: rolFromPrisma(row.rol),
  createdAt: row.createdAt,
});