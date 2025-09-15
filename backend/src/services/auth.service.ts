import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import { sign, type SignOptions } from "jsonwebtoken";

type DbRol = "ADMINISTRADOR" | "USUARIO";
type TokenRol = "ADMIN" | "USER";

const toTokenRole = (db: DbRol): TokenRol => (db === "ADMINISTRADOR" ? "ADMIN" : "USER");

export interface LoginData { mail: string; password: string; }

export async function login(data: LoginData) {
  const user = await prisma.usuario.findUnique({ where: { mail: data.mail } });
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

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    const err: any = new Error("JWT secret no esta definido (.env JWT_SECRET)");
    err.statusCode = 500;
    throw err;
  }

  const opts: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN && process.env.JWT_EXPIRES_IN.length > 0 ? 
      (process.env.JWT_EXPIRES_IN as any) : 
      "2h",
  };

  const token = sign(
    { id: user.id, email: user.mail, role: toTokenRole(user.rol as DbRol) },
    jwtSecret,
    opts
  );

  const { passwordHash, ...safeUser } = user;
  return { user: safeUser, token };
}
