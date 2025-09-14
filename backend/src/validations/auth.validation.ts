import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Debe ser un email válido").nonempty("El email es requerido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").nonempty("La contraseña es requerida"),
  }),
});
