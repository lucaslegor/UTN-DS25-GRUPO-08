import { Router } from "express";
import { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario, login, register } from "../controllers/usuario.controller";
import {
  crearUsuarioSchema,
  loginSchema,
  actualizarUsuarioSchema,
} from "../validations/usuarios.validation";
import { validate } from "../middlewares/validation.middleware";

export const usuariosRoutes = Router();

// CRUD
usuariosRoutes.get("/", getUsuarios);
usuariosRoutes.get("/:username", getUsuario);
usuariosRoutes.post("/", validate(crearUsuarioSchema), postUsuario);
usuariosRoutes.put("/:username", validate(actualizarUsuarioSchema), putUsuario);
usuariosRoutes.delete("/:username", deleteUsuario);

// Auth
usuariosRoutes.post("/login", validate(loginSchema), login);
usuariosRoutes.post("/register", register);
