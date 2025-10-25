// src/services/auth.service.ts
import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import { sign, verify, type SignOptions } from "jsonwebtoken";

type DbRol = "ADMINISTRADOR" | "USUARIO";
type TokenRol = "ADMINISTRADOR" | "USUARIO";
const toTokenRole = (db: DbRol): TokenRol => (db === "ADMINISTRADOR" ? "ADMINISTRADOR" : "USUARIO");

// ===========================
// Helpers de entorno / tipos
// ===========================
function mustEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not defined (.env)`);
  return v;
}

const coerceExp = (v: string): SignOptions["expiresIn"] =>
  v as unknown as SignOptions["expiresIn"];

// ===========================
// Firmas de tokens
// ===========================
export function signAccessToken(payload: object) {
  const secret = mustEnv("JWT_SECRET");
  const exp = coerceExp(process.env.JWT_EXPIRES_IN || "15m"); // p.ej. "15m"
  const opts: SignOptions = { expiresIn: exp };
  return sign(payload, secret, opts);
}

export function signRefreshToken(payload: object) {
  const secret = mustEnv("JWT_REFRESH_SECRET");
  const exp = coerceExp(process.env.JWT_REFRESH_EXPIRES_IN || "7d"); // p.ej. "7d"
  const opts: SignOptions = { expiresIn: exp };
  return sign(payload, secret, opts);
}

/** Token para reset de contraseña (corto) */
function signResetToken(userId: number) {
  const secret = process.env.JWT_RESET_SECRET || "reset_secret_default";
  const exp = coerceExp(process.env.JWT_RESET_EXPIRES_IN || "15m");
  const opts: SignOptions = { expiresIn: exp };
  return sign({ id: userId, purpose: "reset" }, secret, opts);
}

// ===========================
// API pública del servicio
// ===========================
export interface LoginData {
  mail?: string;       // opcional si usas username
  username?: string;   // opcional si usas mail
  password: string;
}

/** Login: valida credenciales, devuelve access + refresh */
export async function login(data: LoginData) {
  const where = data.mail
    ? { mail: data.mail.toLowerCase() }
    : { username: (data.username || "").trim() };

  const user = await prisma.usuario.findUnique({ where });
  if (!user) {
    const err: any = new Error("Credenciales inválidas");
    err.statusCode = 401;
    throw err;
  }

  const ok = await bcrypt.compare(data.password, user.passwordHash);
  if (!ok) {
    const err: any = new Error("Credenciales inválidas");
    err.statusCode = 401;
    throw err;
  }

  const payload = {
    id: user.id,
    email: user.mail,
    role: toTokenRole(user.rol as DbRol),
  };

  const token = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  const { passwordHash, ...safeUser } = user;
  return { user: safeUser, token, refreshToken };
}

/** Refresh: valida refresh token y emite nuevo access (+ refresh rotado opcionalmente) */
export function refreshAccessToken(oldRefreshToken: string) {
  const secret = mustEnv("JWT_REFRESH_SECRET");
  let decoded: any;
  try {
    decoded = verify(oldRefreshToken, secret) as any;
  } catch {
    const err: any = new Error("Refresh token inválido o expirado");
    err.statusCode = 401;
    throw err;
  }

  const payload = { id: decoded.id, email: decoded.email, role: decoded.role };
  const token = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload); // rotación simple

  return { token, refreshToken };
}

/**
 * Olvidé mi contraseña: genera token de reseteo y URL.
 * El envío de email hacelo en el controller con nodemailer (o EmailJS).
 */
export async function forgotPassword(mail: string, origin?: string) {
  const user = await prisma.usuario.findUnique({
    where: { mail: mail.toLowerCase() },
    select: { id: true, mail: true, username: true },
  });

  // Siempre devolvemos 200 para no permitir enumeration.
  if (!user) {
    return { ok: true, resetToken: null, resetUrl: null };
  }

  const resetToken = signResetToken(user.id);
  const appUrl = origin || process.env.APP_URL || "http://localhost:5173";
  const resetUrl = `${appUrl.replace(/\/$/, "")}/reset-password?token=${encodeURIComponent(resetToken)}`;

  // Si implementás nodemailer, envialo en el controller:
  // await sendPasswordResetEmail({ to: user.mail, username: user.username, resetUrl });

  return { ok: true, resetToken, resetUrl };
}

/** Resetea la contraseña usando el token recibido por email */
export async function resetPassword(token: string, newPassword: string) {
  const secret = process.env.JWT_RESET_SECRET || "reset_secret_default";
  let decoded: any;
  try {
    decoded = verify(token, secret) as any;
  } catch {
    const err: any = new Error("Token de reseteo inválido o expirado");
    err.statusCode = 400;
    throw err;
  }

  if (decoded?.purpose !== "reset" || typeof decoded?.id !== "number") {
    const err: any = new Error("Token de reseteo inválido");
    err.statusCode = 400;
    throw err;
  }

  const hash = await bcrypt.hash(newPassword, 10);
  await prisma.usuario.update({
    where: { id: decoded.id },
    data: { passwordHash: hash },
  });

  return { ok: true };
}
