import { Request, Response, NextFunction } from "express";
import { Usuario, UsuarioPublic, Rol } from "../types/usuarios.types";
import {crearUsuario, listarUsuarios, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario} from '../services/usuarios.service'

//Listar todos los usuarios


export const getUsuarios = (req: Request, res: Response) => {
  const usuarios: UsuarioPublic[] = listarUsuarios();
  res.json({ usuarios, total: usuarios.length });
};

export const getUsuarioById = (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id);
  const usuario = obtenerUsuarioPorId(id); // debe devolver UsuarioPublic | null
  if (!usuario) return res.status(404).json({ usuario: null, message: "Usuario no encontrado" });
  res.json({ usuario });
};

type CreateUsuarioBody = { username: string; password: string; rol?: Rol };

export const createUsuario = async (
  req: Request<{}, {}, CreateUsuarioBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, rol } = req.body;
    if (!username || !password)
      return res.status(400).json({ usuario: null, message: "Faltan campos" });
    const usuario = await crearUsuario(username, password, rol ?? "Usuario"); // UsuarioPublic
    res.status(201).json({ usuario, message: "Usuario creado" });
  } catch (err) {
    next(err);
  }
};

type UpdateUsuarioBody = { username?: string; password?: string; rol?: Rol };

export const updateUsuario = async (
  req: Request<{ id: string }, {}, UpdateUsuarioBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const { username, password, rol } = req.body;

    const data: Partial<Omit<Usuario, "idUsuario" | "createdAt">> = {};
    if (username) data.username = username;  
    if (password) data.passwordHash = password;
    if (rol) data.rol = rol;

    const usuario = actualizarUsuario(id, data); // UsuarioPublic | null
    if (!usuario) return res.status(404).json({ usuario: null, message: "Usuario no encontrado" });

    res.json({ usuario, message: "Usuario actualizado" });
  } catch (err) {
    next(err);
  }
};

export const deleteUsuario = (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id);
  const usuario = eliminarUsuario(id); // UsuarioPublic | null
  if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json({ usuario, message: "Usuario eliminado" });
};
