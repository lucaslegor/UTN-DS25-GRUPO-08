// src/validations/usuario.validation.ts
import { z } from "zod";

export const rolUsuarioEnum = z.enum(["ADMINISTRADOR", "USUARIO"]);

export const crearUsuarioSchema = z.object({
  username: z.string()
  .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
  .max(50)
  .trim(),
  mail: z.string()
  .email("Formato de email inválido"),
  password: z.string()
  .min(8, "La contraseña debe tener al menos 8 caracteres"),
  rol: rolUsuarioEnum.default("USUARIO"),
});

export const actualizarUsuarioSchema = crearUsuarioSchema.partial();