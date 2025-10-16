import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; email: string; role: "USUARIO" | "ADMINISTRADOR" };
    }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}

export function authorize(...roles: ("USUARIO" | "ADMINISTRADOR")[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: "No autenticado" });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "No tienes permisos" });
    }
    next();
  };
}
