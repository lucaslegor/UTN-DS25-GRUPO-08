import { Router } from "express";
import nodemailer from "nodemailer";
import { login, refreshAccessToken, forgotPassword, resetPassword } from "../services/auth.service";
import { loginSchema, forgotPasswordSchema, resetPasswordSchema } from "../validations/auth.validation";
import { authenticate } from "../middlewares/auth.middleware";
import prisma from "../config/prisma";
import { transporter } from "../utils/mailer";


const router = Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Validación inválida", issues: parsed.error.flatten() });
  }
  try {
    const { user, token, refreshToken } = await login(parsed.data);

    // Seteamos cookie httpOnly con refresh
    res.cookie("rt", refreshToken, {
      httpOnly: true,
      secure: false,       // true en prod con HTTPS
      sameSite: "lax",
      path: "/api/auth",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
    });

    return res.json({
      token,
      user: {
        idUsuario: user.id,
        username: user.username,
        mail: user.mail,
        rol: user.rol,      // "ADMINISTRADOR" | "USUARIO"
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
    // rotación simple del refresh
    res.cookie("rt", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/api/auth",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return res.json({ token });
  } catch (err: any) {
    return res.status(err.statusCode ?? 401).json({ message: err.message || "Error" });
  }
});

// POST /api/auth/logout
router.post("/logout", (_req, res) => {
  res.clearCookie("rt", { path: "/api/auth" });
  return res.json({ ok: true });
});

// GET /api/auth/user (quién soy)
router.get("/user", authenticate, async (req, res) => {
  const u = await prisma.usuario.findUnique({ where: { id: req.user!.id } });
  if (!u) return res.status(404).json({ message: "Usuario no encontrado" });
  return res.json({
    user: { idUsuario: u.id, username: u.username, mail: u.mail, rol: u.rol, createdAt: u.createdAt },
  });
});

// POST /api/auth/forgot (solicitar reset)
router.post("/forgot", async (req, res) => {
  const parsed = forgotPasswordSchema.safeParse({
    mail: req.body?.mail,
    origin: req.body?.origin || (req.headers.origin as string | undefined),
  });

  if (!parsed.success) {
    console.error("Zod forgot error:", parsed.error.flatten());
    return res
      .status(400)
      .json({ message: "Validación inválida", issues: parsed.error.flatten() });
  }

  try {
    const { mail, origin } = parsed.data;

    const { resetToken, resetUrl } = await forgotPassword(mail, origin);

    // No reveles si el mail existe o no
    if (!resetToken || !resetUrl) {
      return res.json({ ok: true });
    }

    const html = `
      <p>Hola,</p>
      <p>Para restablecer tu contraseña hacé click en el siguiente enlace:</p>
      <p><a href="${resetUrl}" target="_blank" rel="noopener noreferrer">${resetUrl}</a></p>
      <p>Si no solicitaste este cambio, ignorá este mensaje.</p>
    `;

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || "no-reply@maps.com",
      to: mail,
      subject: "Restablecer contraseña",
      html,
    });

    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) console.log("Ethereal preview URL:", previewUrl);

    return res.json({ ok: true });
  } catch (err: any) {
    console.error("forgot handler error:", err);
    return res.status(500).json({ message: err.message || "Error enviando mail" });
  }
});



// POST /api/auth/reset (actualizar contraseña con token)
router.post("/reset", async (req, res) => {
  const parsed = resetPasswordSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Validación inválida", issues: parsed.error.flatten() });
  }
  try {
    await resetPassword(parsed.data.token, parsed.data.newPassword);
    return res.json({ ok: true });
  } catch (err: any) {
    return res.status(err.statusCode ?? 400).json({ message: err.message || "Error" });
  }
});

export default router;
