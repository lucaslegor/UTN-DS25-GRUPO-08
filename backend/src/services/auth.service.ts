import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import { sign, verify, type SignOptions } from "jsonwebtoken";
import { enviarRecupero } from "./email.service";

type DbRol = "ADMINISTRADOR" | "USUARIO";
type TokenRol = "ADMINISTRADOR" | "USUARIO";
const toTokenRole = (db: DbRol): TokenRol => (db === "ADMINISTRADOR" ? "ADMINISTRADOR" : "USUARIO");

function mustEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not defined (.env)`);
  return v;
}

const coerceExp = (v: string): SignOptions["expiresIn"] =>
  v as unknown as SignOptions["expiresIn"];

export function signAccessToken(payload: object) {
  const secret = mustEnv("JWT_SECRET");
  const exp = coerceExp(process.env.JWT_EXPIRES_IN || "15m");
  const opts: SignOptions = { expiresIn: exp };
  return sign(payload, secret, opts);
}

export function signRefreshToken(payload: object) {
  const secret = mustEnv("JWT_REFRESH_SECRET");
  const exp = coerceExp(process.env.JWT_REFRESH_EXPIRES_IN || "7d");
  const opts: SignOptions = { expiresIn: exp };
  return sign(payload, secret, opts);
}

function signResetToken(userId: number) {
  const secret = process.env.JWT_RESET_SECRET || "reset_secret_default";
  const exp = coerceExp(process.env.JWT_RESET_EXPIRES_IN || "15m");
  const opts: SignOptions = { expiresIn: exp };
  return sign({ id: userId, purpose: "reset" }, secret, opts);
}

export interface LoginData {
  mail?: string;
  username?: string;
  password: string;
}

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
  const refreshToken = signRefreshToken(payload);

  return { token, refreshToken };
}

export async function forgotPassword(mail: string, origin?: string) {
  const user = await prisma.usuario.findUnique({
    where: { mail: mail.toLowerCase() },
    select: { id: true, mail: true, username: true },
  });

  if (!user) {
    return { ok: true, resetToken: null, resetUrl: null };
  }

  const resetToken = signResetToken(user.id);
  const appUrl = origin || process.env.APP_URL || "http://localhost:5173";
  const resetUrl = `${appUrl.replace(/\/$/, "")}/reset-password?token=${encodeURIComponent(resetToken)}`;

  await enviarRecupero(user.mail, resetUrl);

  return { ok: true, resetToken, resetUrl };
}

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
