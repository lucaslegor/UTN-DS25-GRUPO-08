// routes/auth.routes.ts
import { Router } from "express";
import prisma from "../config/prisma";
import { login } from "../services/auth.service";
import { loginSchema } from "../validations/auth.validation";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  // Tu schema envuelve en { body: { ... } }
  const parsed = loginSchema.safeParse({ body: req.body });

  if (!parsed.success) {
    return res.status(400).json({
      message: "Validación inválida",
      issues: parsed.error.flatten(),
    });
  }

  const { username, mail, password } = parsed.data.body;

  try {
    // Normalizamos a mail porque el service espera { mail, password }
    let finalMail = mail;

    if (!finalMail && username) {
      const u = await prisma.usuario.findUnique({ where: { username } });
      // Si no existe, tiramos el mismo error que credenciales inválidas
      if (!u) return res.status(401).json({ message: "Credenciales inválidas" });
      finalMail = u.mail;
    }

    // Seguridad extra por si algo quedó undefined
    if (!finalMail) {
      return res.status(400).json({ message: "Se requiere mail o username válido" });
    }

    const { user, token } = await login({ mail: finalMail, password });

    return res.json({
      token,
      user: {
        idUsuario: user.id,
        username: user.username,
        mail: user.mail,
        rol: user.rol, // "ADMINISTRADOR" | "USUARIO"
        createdAt: user.createdAt,
      },
    });
  } catch (err: any) {
    return res
      .status(err?.statusCode ?? 500)
      .json({ message: err?.message || "Error" });
  }
});

// GET /api/auth/user  (protegido)
router.get("/user", authenticate, async (req, res) => {
  try {
    const user = await prisma.usuario.findUnique({ where: { id: req.user!.id } });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    return res.json({
      user: {
        idUsuario: user.id,
        username: user.username,
        mail: user.mail,
        rol: user.rol,
        createdAt: user.createdAt,
      },
    });
  } catch {
    return res.status(500).json({ message: "Error" });
  }
});

export default router;
