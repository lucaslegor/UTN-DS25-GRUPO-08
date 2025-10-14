import { Router } from "express";
import cookieParser from "cookie-parser";
import { login, refreshAccessToken } from "../services/auth.service";
import { loginSchema } from "../validations/auth.validation";
import prisma from "../config/prisma";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();
router.use(cookieParser());

// POST /api/auth/login
router.post("/login", async (req, res) => {
  // 👇 Envolvemos el body para que coincida con el schema actual
  const parsed = loginSchema.safeParse({ body: req.body });
  if (!parsed.success) {
    return res.status(400).json({
      message: "Validación inválida",
      issues: parsed.error.flatten(),
    });
  }

  try {
    const { mail, username, password } = parsed.data.body;

    // Si vino username, lo resolvemos a mail (tu service exige mail)
    let finalMail = mail;
    if (!finalMail && username) {
      const u = await prisma.usuario.findUnique({ where: { username } });
      if (!u) return res.status(401).json({ message: "Credenciales inválidas" });
      finalMail = u.mail;
    }

    const { user, token, refreshToken } = await login({
      mail: finalMail!,
      password,
    });

    res.cookie("rt", refreshToken, {
      httpOnly: true,
      secure: false,   // true en prod (HTTPS)
      sameSite: "lax",
      path: "/api/auth",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.json({
      token,
      user: {
        idUsuario: user.id,
        username: user.username,
        mail: user.mail,
        rol: user.rol,
        createdAt: user.createdAt,
      },
    });
  } catch (err: any) {
    return res.status(err.statusCode ?? 500).json({ message: err.message || "Error" });
  }
});

// POST /api/auth/refresh
router.post("/refresh", (req, res) => {
  const rt = req.cookies?.rt as string | undefined;
  if (!rt) return res.status(401).json({ message: "No refresh token" });

  try {
    const { token, refreshToken } = refreshAccessToken(rt);
    res.cookie("rt", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/api/auth",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return res.json({ token });
  } catch (err: any) {
    return res
      .status(err.statusCode ?? 401)
      .json({ message: err.message || "Error" });
  }
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  res.clearCookie("rt", { path: "/api/auth" });
  return res.json({ ok: true });
});

// GET /api/auth/user (opcional)
router.get("/user", authenticate, async (req, res) => {
  const u = await prisma.usuario.findUnique({ where: { id: req.user!.id } });
  if (!u) return res.status(404).json({ message: "Usuario no encontrado" });
  return res.json({
    user: {
      idUsuario: u.id,
      username: u.username,
      mail: u.mail,
      rol: u.rol,
      createdAt: u.createdAt,
    },
  });
});

export default router;
