import { Usuario, UsuarioPublic, Rol } from "../types/usuarios.types";
import { toUsuarioPublic } from "../utils/UserMapperToPublic";
import prisma from "../config/prisma";

// Base de datos simulada
let usuarios: Usuario[] = [
  {
    idUsuario: 1,
    username: "admin",
    passwordHash: "hash:admin123", // Ejemplo, en real usar bcrypt
    rol: "Administrador",
    createdAt: new Date("2025-01-10T10:00:00Z")
  },
  {
    idUsuario: 2,
    username: "juanperez",
    passwordHash: "hash:juan123",
    rol: "Usuario",
    createdAt: new Date("2025-02-15T14:30:00Z")
  },
  {
    idUsuario: 3,
    username: "maria",
    passwordHash: "hash:maria123",
    rol: "Usuario",
    createdAt: new Date("2025-03-01T09:15:00Z")
  }
];

let nextId = usuarios.length + 1;

export { usuarios, nextId };

// Helpers de mapeo entre tus tipos y Prisma
const rolToPrisma = (rol: Rol) => (rol === "Administrador" ? "ADMINISTRADOR" : "USUARIO");
const rolFromPrisma = (rol: "ADMINISTRADOR" | "USUARIO"): Rol =>
  rol === "ADMINISTRADOR" ? "Administrador" : "Usuario";

const mapDbToUsuario = (row: {
  id: number;
  username: string;
  passwordHash: string;
  rol: "ADMINISTRADOR" | "USUARIO";
  createdAt: Date;
}): Usuario => ({
  idUsuario: row.id,
  username: row.username,
  passwordHash: row.passwordHash,
  rol: rolFromPrisma(row.rol),
  createdAt: row.createdAt,
});

// --------- Services ---------

export const listarUsuarios = async (): Promise<UsuarioPublic[]> => {
  const rows = await prisma.usuario.findMany({
    orderBy: { id: "asc" },
  });
  return rows.map(r => toUsuarioPublic(mapDbToUsuario(r)));
};

export const obtenerUsuarioPorId = async (id: number): Promise<UsuarioPublic | null> => {
  const row = await prisma.usuario.findUnique({
    where: { id },
  });
  if (!row) return null;
  return toUsuarioPublic(mapDbToUsuario(row));
};

export async function crearUsuario(
  username: string,
  passwordHash: string,
  rol: Rol = "Usuario"
): Promise<UsuarioPublic> {
  const exists = await prisma.usuario.findUnique({ where: { username } });
  if (exists) {
    throw new Error("El nombre de usuario ya existe");
  }

  const created = await prisma.usuario.create({
    data: {
      username,
      passwordHash,
      rol: rolToPrisma(rol), // enum Prisma
      // createdAt lo setea Prisma por default
    },
  });

  return toUsuarioPublic(mapDbToUsuario(created));
}

export async function actualizarUsuario(
  username: string,
  data: Partial<Omit<Usuario, "idUsuario" | "createdAt">>
): Promise<UsuarioPublic | null> {
  // Buscar por username 
  const existing = await prisma.usuario.findUnique({ where: { username } });
  if (!existing) return null;

  const payload: {
    username?: string;
    passwordHash?: string;
    rol?: "ADMINISTRADOR" | "USUARIO";
  } = {};

  if (typeof data.username === "string" && data.username.trim()) {
    payload.username = data.username.trim();
  }
  if (typeof data.passwordHash === "string" && data.passwordHash.trim()) {
    payload.passwordHash = data.passwordHash;
  }
  if (typeof data.rol === "string") {
    payload.rol = rolToPrisma(data.rol);
  }

  const updated = await prisma.usuario.update({
    where: { username },
    data: payload,
  });

  return toUsuarioPublic(mapDbToUsuario(updated));
}

export async function eliminarUsuario(id: number): Promise<UsuarioPublic | null> {
  const row = await prisma.usuario.findUnique({ where: { id } });
  if (!row) return null;

  const deleted = await prisma.usuario.delete({ where: { id } });
  return toUsuarioPublic(mapDbToUsuario(deleted));
}
