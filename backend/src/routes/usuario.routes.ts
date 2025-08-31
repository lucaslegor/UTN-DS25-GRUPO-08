// src/routes/usuarios.routes.ts
import { Router } from "express";
import * as controllerUsuario from "../controllers/usuario.controller";
import { validate } from "../middlewares/validation.middleware";
import { crearUsuarioSchema, actualizarUsuarioSchema } from "../validations/usuarios.validation";

const router = Router();

router.get("/", controllerUsuario.getUsuarios);
router.get("/:username", controllerUsuario.getUsuarioByUsername);
router.post("/", validate(crearUsuarioSchema), controllerUsuario.createUsuario);
router.put("/:username", validate(actualizarUsuarioSchema), controllerUsuario.updateUsuario);
router.delete("/:username", controllerUsuario.deleteUsuario);

export default router;
