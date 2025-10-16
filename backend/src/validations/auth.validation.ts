// src/validations/auth.validation.ts
import { z } from "zod";

export const loginSchema = z.object({
  mail: z.string().email().optional(),
  username: z.string().min(1).trim().optional(),
  password: z.string().min(8),
}).refine((data) => !!data.mail || !!data.username, {
  message: "Debe enviar username o mail",
  path: ["mail"],
});

export const forgotPasswordSchema = z.object({
  mail: z.string().email(),
  origin: z.string().url().optional(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  newPassword: z.string().min(8),
});
