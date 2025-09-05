import { z } from "zod";

export const rolUsuarioEnum = z.enum(["ADMINISTRADOR", "USUARIO"]);

export const crearUsuarioSchema = z.object({
  username: z.string().min(3).max(50).trim(),
  mail: z.string().email(),
  password: z.string().min(8),
  rol: rolUsuarioEnum.default("USUARIO"),
});

export const loginSchema = z.object({
  username: z.string().min(1).trim().optional(),
  mail: z.string().email().optional(),
  password: z.string().min(8),
}).refine((data) => !!data.username || !!data.mail, {
  message: "Debe enviar username o mail",
  path: ["username"],
});

export const actualizarUsuarioSchema = z.object({
  username: z.string().min(3).max(50).trim().optional(),
  mail: z.string().email().optional(),
  password: z.string().min(8).optional(),
  rol: rolUsuarioEnum.optional(),
});
