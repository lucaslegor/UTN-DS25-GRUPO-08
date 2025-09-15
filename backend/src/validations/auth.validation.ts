import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    username: z.string().min(1).trim().optional(),
    mail: z.string().email().optional(),
    password: z.string().min(8),
  })
  .refine((data) => !!data.username || !!data.mail, {
    message: "Debe enviar username o mail",
    path: ["username"],
  })
});
