import { Request, Response, NextFunction } from "express";
import { crearUsuario, listarUsuarios, obtenerUsuarioPorUsername, actualizarUsuario, eliminarUsuario} from "../services/usuarios.service";
import { crearUsuarioSchema, loginSchema, actualizarUsuarioSchema } from "../validations/usuarios.validation";
import type { UsuarioPublic } from "../types/usuarios.types";
import prisma from "../config/prisma";

// GET /api/usuarios
export const getUsuarios = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const usuarios: UsuarioPublic[] = await listarUsuarios();
    res.json({ usuarios, total: usuarios.length });
  } catch (err) {
    next(err);
  }
};

// GET /api/usuarios/:username
export const getUsuario = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const u = await obtenerUsuarioPorUsername(req.params.username);
    if (!u) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ usuario: u });
  } catch (err) {
    next(err);
  }
};

// POST /api/usuarios
export const postUsuario = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = crearUsuarioSchema.parse(req.body);
    const usuario = await crearUsuario(parsed.username, parsed.mail, parsed.password, parsed.rol === "ADMINISTRADOR" ? "Administrador" : "Usuario");
    res.status(201).json({ usuario, message: "Usuario creado" });
  } catch (err) {
    next(err);
  }
};

// PUT /api/usuarios/:username
export const putUsuario = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = actualizarUsuarioSchema.parse(req.body);
    const usuario = await actualizarUsuario(req.params.username, {
      username: parsed.username,
      mail: parsed.mail,
      password: parsed.password,
      rol: parsed.rol ? (parsed.rol === "ADMINISTRADOR" ? "Administrador" : "Usuario") : undefined,
    });
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ usuario, message: "Usuario actualizado" });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/usuarios/:username
export const deleteUsuario = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ok = await eliminarUsuario(req.params.username);
    if (!ok) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    next(err);
  }
};

export async function user(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: "No autenticado" });
  const row = await prisma.usuario.findUnique({ where: { id: req.user.id } });
  if (!row) return res.status(404).json({ message: "Usuario no encontrado" });
  const { passwordHash, ...safe } = row;
  res.json({ user: safe });
}
