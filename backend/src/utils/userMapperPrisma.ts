// src/utils/UserPrismaMapper.ts
import type { $Enums, Usuario as PrismaUsuario } from "../generated/prisma";
import type { Usuario, Rol } from "../types/usuarios.types";

const rolFromPrisma = (r: $Enums.RolUsuario): Rol =>
  r === "ADMINISTRADOR" ? "Administrador" : "Usuario";

const rolToPrisma = (r: Rol): $Enums.RolUsuario =>
  r === "Administrador" ? "ADMINISTRADOR" : "USUARIO";

export const mapDbToUsuario = (row: PrismaUsuario): Usuario => ({
  idUsuario: row.id,
  username: row.username,
  mail: row.mail,
  passwordHash: row.passwordHash,
  rol: rolFromPrisma(row.rol),
  createdAt: row.createdAt,
});

export { rolFromPrisma, rolToPrisma };
