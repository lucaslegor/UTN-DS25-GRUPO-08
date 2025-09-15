import prisma from "../config/prisma";
import * as bcrypt from "bcrypt";                  
import { sign, type SignOptions } from "jsonwebtoken";  

export interface LoginData { email: string; password: string; }

export async function login(data: LoginData) {
  const user = await prisma.usuario.findUnique({ where: { mail: data.email } });
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
    const err: any = new Error("JWT secret is not defined (.env JWT_SECRET)");
    err.statusCode = 500;
    throw err;
  }


  const opts: SignOptions = {};
  const defaultExp = "2h" as const;
  if (process.env.JWT_EXPIRES_IN && process.env.JWT_EXPIRES_IN.length > 0) {
    opts.expiresIn = process.env.JWT_EXPIRES_IN as unknown as SignOptions["expiresIn"];
  } else {
    opts.expiresIn = defaultExp; 
  }
 

  const token = sign(
    { id: user.id, email: user.mail, role: user.rol },
    jwtSecret,
    opts
  );

  const { passwordHash, ...safeUser } = user;
  return { user: safeUser, token };
}
