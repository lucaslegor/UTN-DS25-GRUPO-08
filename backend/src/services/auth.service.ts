import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import { sign, verify, type SignOptions } from "jsonwebtoken";

type DbRol = "ADMINISTRADOR" | "USUARIO";
type TokenRol = "ADMIN" | "USER";
const toTokenRole = (db: DbRol): TokenRol => (db === "ADMINISTRADOR" ? "ADMIN" : "USER");

const ACCESS_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

const ACCESS_EXP = (process.env.JWT_EXPIRES_IN?.trim() || "15m") as SignOptions["expiresIn"];
const REFRESH_EXP = (process.env.JWT_REFRESH_EXPIRES_IN?.trim() || "7d") as SignOptions["expiresIn"];

function issueTokens(user: { id: number; mail: string; rol: DbRol }) {
  const payload = { id: user.id, email: user.mail, role: toTokenRole(user.rol) };
  const token = sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXP });
  const refreshToken = sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXP });
  return { token, refreshToken };
}

export interface LoginData { mail: string; password: string; }

export async function login(data: LoginData) {
  if (!ACCESS_SECRET || !REFRESH_SECRET) {
    const err: any = new Error("JWT secrets are not defined (.env)");
    err.statusCode = 500;
    throw err;
  }

  const user = await prisma.usuario.findUnique({ where: { mail: data.mail } });
  if (!user) { const e:any=new Error("Credenciales inválidas"); e.statusCode=401; throw e; }

  const ok = await bcrypt.compare(data.password, user.passwordHash);
  if (!ok) { const e:any=new Error("Credenciales inválidas"); e.statusCode=401; throw e; }

  const { token, refreshToken } = issueTokens(user);
  const { passwordHash, ...safeUser } = user;
  return { user: safeUser, token, refreshToken };
}

export function refreshAccessToken(rt: string) {
  try {
    const decoded = verify(rt, REFRESH_SECRET) as any;
    // Re-emitimos un access y (si querés) también rotamos refresh.
    const { token, refreshToken } = issueTokens({
      id: decoded.id,
      mail: decoded.email,
      rol: decoded.role === "ADMIN" ? "ADMINISTRADOR" : "USUARIO",
    });
    return { token, refreshToken };
  } catch {
    const e: any = new Error("Refresh token inválido/expirado");
    e.statusCode = 401;
    throw e;
  }
}
