// src/services/usuarios.service.ts
import prisma from "../config/prisma";
import { toUsuarioPublic } from "../utils/UserMapperToPublic";
import { mapDbToUsuario, rolToPrisma } from "../utils/userMapperPrisma";
import type { UsuarioPublic, Rol } from "../types/usuarios.types";
import type { $Enums } from "../generated/prisma";

// listar
export async function listarUsuarios(): Promise<UsuarioPublic[]> {
  const rows = await prisma.usuario.findMany({ orderBy: { id: "asc" } });
  return rows.map(r => toUsuarioPublic(mapDbToUsuario(r)));
}

// obtener por username
export async function obtenerUsuarioPorUsername(username: string): Promise<UsuarioPublic | null> {
  const row = await prisma.usuario.findUnique({ where: { username } });
  return row ? toUsuarioPublic(mapDbToUsuario(row)) : null;
}

// crear (usa RegisterRequest -> username, mail, password, rol?)
export async function crearUsuario(
  username: string,
  mail: string,
  passwordHash: string,
  rol: Rol = "Usuario"
): Promise<UsuarioPublic> {
  const created = await prisma.usuario.create({
    data: { username, mail, passwordHash, rol: rolToPrisma(rol) as $Enums.RolUsuario },
  });
  return toUsuarioPublic(mapDbToUsuario(created));
}

// actualizar por username (Partial de Usuario, sin id/createdAt)
export async function actualizarUsuario(
  username: string,
  data: Partial<Pick<import("../types/usuarios.types").Usuario, "username" | "mail" | "passwordHash" | "rol">>
): Promise<UsuarioPublic | null> {
  const exists = await prisma.usuario.findUnique({ where: { username } });
  if (!exists) return null;

  //Objeto en el que voy a guardar lo que se cambia, mas limpio
  const payload: {
    username?: string;
    mail?: string;
    passwordHash?: string;
    rol?: $Enums.RolUsuario;
  } = {};

  if (data.username) payload.username = data.username.trim();
  if (data.mail) payload.mail = data.mail.trim().toLowerCase();
  if (data.passwordHash) payload.passwordHash = data.passwordHash;
  if (data.rol) payload.rol = (data.rol === "Administrador" ? "ADMINISTRADOR" : "USUARIO");

  const updated = await prisma.usuario.update({ where: { username }, data: payload });
  return toUsuarioPublic(mapDbToUsuario(updated));
}

// eliminar
export async function eliminarUsuario(username: string): Promise<{ message: string }> {
  await prisma.usuario.delete({ where: { username } });
  return { message: "Usuario eliminado con éxito" };
}
