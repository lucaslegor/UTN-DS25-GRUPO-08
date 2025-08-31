// src/controllers/usuarios.controller.ts
import { Request, Response, NextFunction } from "express";
import { UsuarioPublic, Rol, Usuario } from "../types/usuarios.types";
import {
  crearUsuario,
  listarUsuarios,
  obtenerUsuarioPorUsername,
  actualizarUsuario,
  eliminarUsuario,
} from "../services/usuarios.service";

// Listar todos los usuarios
export const getUsuarios = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const usuarios: UsuarioPublic[] = await listarUsuarios();
    res.json({ usuarios, total: usuarios.length });
  } catch (err) {
    next(err);
  }
};

export const getUsuarioByUsername = async (
  req: Request<{ username: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const username = req.params.username;
    const usuario = await obtenerUsuarioPorUsername(username); // UsuarioPublic | null
    if (!usuario) return res.status(404).json({ usuario: null, message: "Usuario no encontrado" });
    res.json({ usuario });
  } catch (err) {
    next(err);
  }
};

// Body para crear (incluye mail)
type CreateUsuarioBody = { username: string; mail: string; password: string; rol?: Rol };

export const createUsuario = async (
  req: Request<{}, {}, CreateUsuarioBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, mail, password, rol } = req.body;
    if (!username || !mail || !password) {
      return res.status(400).json({ usuario: null, message: "Faltan campos" });
    }
    const usuario = await crearUsuario(username, mail, password, rol ?? "Usuario"); // UsuarioPublic
    res.status(201).json({ usuario, message: "Usuario creado" });
  } catch (err) {
    next(err);
  }
};

// Body para actualizar (opcionales)
type UpdateUsuarioBody = { username?: string; mail?: string; password?: string; rol?: Rol };

export const updateUsuario = async (
  req: Request<{ username: string }, {}, UpdateUsuarioBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const usernameParam = req.params.username;
    const { username, mail, password, rol } = req.body;

    // El service espera passwordHash, no password
    const data: Partial<Pick<Usuario, "username" | "mail" | "rol" | "passwordHash">> = {};
    if (username) data.username = username;
    if (mail) data.mail = mail;
    if (rol) data.rol = rol;
    if (password) data.passwordHash = password; // si tu service hashea, lo hará internamente

    const usuario = await actualizarUsuario(usernameParam, data); // UsuarioPublic | null
    if (!usuario) return res.status(404).json({ usuario: null, message: "Usuario no encontrado" });

    res.json({ usuario, message: "Usuario actualizado" });
  } catch (err) {
    next(err);
  }
};

// Eliminar usuario por username (string), no por id
export const deleteUsuario = async (
  req: Request<{ username: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const username = req.params.username;
    const usuario = await eliminarUsuario(username); // UsuarioPublic | null
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ usuario, message: "Usuario eliminado" });
  } catch (err) {
    next(err);
  }
};
