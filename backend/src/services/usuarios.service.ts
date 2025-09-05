import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { toUsuarioPublic } from "../utils/UserMapperToPublic";
import { mapDbToUsuario, rolToPrisma } from "../utils/userMapperPrisma";
import type { UsuarioPublic, Rol } from "../types/usuarios.types";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

/** Lista todos los usuarios (público) */
export async function listarUsuarios(): Promise<UsuarioPublic[]> {
  const rows = await prisma.usuario.findMany({ orderBy: { id: "asc" } });
  return rows.map((r) => toUsuarioPublic(mapDbToUsuario(r)));
}

/** Obtiene un usuario por username (público) */
export async function obtenerUsuarioPorUsername(
  username: string
): Promise<UsuarioPublic | null> {
  const row = await prisma.usuario.findFirst({
    where: { username: { equals: username.trim(), mode: "insensitive" } },
  });
  return row ? toUsuarioPublic(mapDbToUsuario(row)) : null;
}

/** Crea un usuario nuevo */
export async function crearUsuario(
  username: string,
  mail: string,
  password: string,
  rol: Rol = "Usuario"
): Promise<UsuarioPublic> {
  const existsU = await prisma.usuario.findFirst({
    where: { username: { equals: username.trim(), mode: "insensitive" } },
  });
  if (existsU) throw new Error("El nombre de usuario ya existe");

  const existsM = await prisma.usuario.findUnique({
    where: { mail: mail.trim().toLowerCase() },
  });
  if (existsM) throw new Error("El email ya está registrado");

  const passwordHash = await bcrypt.hash(password, 10);

  const created = await prisma.usuario.create({
    data: {
      username: username.trim(),
      mail: mail.trim().toLowerCase(),
      passwordHash,
      rol: rolToPrisma(rol), // "ADMINISTRADOR" | "USUARIO"
    },
  });

  return toUsuarioPublic(mapDbToUsuario(created));
}

/** Actualiza datos de un usuario identificado por su username */
export async function actualizarUsuario(
  username: string,
  data: { username?: string; mail?: string; password?: string; rol?: Rol }
): Promise<UsuarioPublic | null> {
  // Buscamos insensible a mayúsculas para que "Maxi" o "maxi" funcione
  const row = await prisma.usuario.findFirst({
    where: { username: { equals: username.trim(), mode: "insensitive" } },
  });
  if (!row) return null;

  // Armamos payload de actualización (tipado laxo para evitar problemas con tipos generados)
  const payload: Record<string, any> = {};
  if (data.username) payload.username = data.username.trim();
  if (data.mail) payload.mail = data.mail.trim().toLowerCase();
  if (data.password) payload.passwordHash = await bcrypt.hash(data.password, 10);
  if (data.rol) payload.rol = rolToPrisma(data.rol);

  const updated = await prisma.usuario.update({
    where: { id: row.id }, // usamos id para evitar issues con case
    data: payload,
  });

  return toUsuarioPublic(mapDbToUsuario(updated));
}

/** Elimina un usuario por username */
export async function eliminarUsuario(username: string): Promise<boolean> {
  const row = await prisma.usuario.findFirst({
    where: { username: { equals: username.trim(), mode: "insensitive" } },
  });
  if (!row) return false;

  await prisma.usuario.delete({ where: { id: row.id } });
  return true;
}

/** Login con username (case-insensitive) o mail (en minúsculas) */
export async function loginUsuario({
  username,
  mail,
  password,
}: {
  username?: string;
  mail?: string;
  password: string;
}): Promise<{ token: string; user: UsuarioPublic }> {
  let row = null;

  if (username && username.trim()) {
    row = await prisma.usuario.findFirst({
      where: { username: { equals: username.trim(), mode: "insensitive" } },
    });
  } else if (mail && mail.trim()) {
    row = await prisma.usuario.findUnique({
      where: { mail: mail.trim().toLowerCase() },
    });
  }

  if (!row) throw new Error("Credenciales inválidas");

  const ok = await bcrypt.compare(password, row.passwordHash);
  if (!ok) throw new Error("Credenciales inválidas");

  const user = toUsuarioPublic(mapDbToUsuario(row));

  const token = jwt.sign(
    { sub: row.id, username: row.username, rol: row.rol },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { token, user };
}
