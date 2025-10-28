import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import { toUsuarioPublic } from "../utils/UserMapperToPublic";
import { mapDbToUsuario, rolToPrisma } from "../utils/userMapperPrisma";
import type { UsuarioPublic, Rol } from "../types/usuarios.types";
import { enviarBienvenida } from "./email.service";

export async function listarUsuarios(): Promise<UsuarioPublic[]> {
  const rows = await prisma.usuario.findMany({ orderBy: { id: "asc" } });
  return rows.map((r) => toUsuarioPublic(mapDbToUsuario(r)));
}

export async function obtenerUsuarioPorUsername(username: string): Promise<UsuarioPublic | null> {
  const row = await prisma.usuario.findUnique({ where: { username } });
  return row ? toUsuarioPublic(mapDbToUsuario(row)) : null;
}

export async function crearUsuario(
  username: string,
  mail: string,
  password: string,
  rol: Rol = "Usuario"
): Promise<UsuarioPublic> {
  const existsU = await prisma.usuario.findUnique({ where: { username } });
  if (existsU) throw new Error("El nombre de usuario ya existe");

  const existsM = await prisma.usuario.findUnique({ where: { mail: mail.toLowerCase() } });
  if (existsM) throw new Error("El email ya está registrado");

  const passwordHash = await bcrypt.hash(password, 10);

  const created = await prisma.usuario.create({
    data: {
      username: username.trim(),
      mail: mail.trim().toLowerCase(),
      passwordHash,
      rol: rolToPrisma(rol), // 'ADMINISTRADOR' | 'USUARIO'
    },
  });

  // Enviamos email de bienvenida
  await enviarBienvenida(created.username, created.mail);

  return toUsuarioPublic(mapDbToUsuario(created));
}

export async function actualizarUsuario(
  username: string,
  data: { username?: string; mail?: string; password?: string; rol?: Rol }
): Promise<UsuarioPublic | null> {
  const row = await prisma.usuario.findUnique({ where: { username } });
  if (!row) return null;

  const payload: any = {};
  if (data.username) payload.username = data.username.trim();
  if (data.mail) payload.mail = data.mail.trim().toLowerCase();
  if (data.password) payload.passwordHash = await bcrypt.hash(data.password, 10);
  if (data.rol) payload.rol = rolToPrisma(data.rol);

  const updated = await prisma.usuario.update({ where: { username }, data: payload });
  return toUsuarioPublic(mapDbToUsuario(updated));
}

export async function eliminarUsuario(username: string): Promise<boolean> {
  const row = await prisma.usuario.findUnique({ where: { username } });
  if (!row) return false;
  await prisma.usuario.delete({ where: { username } });
  return true;
}
