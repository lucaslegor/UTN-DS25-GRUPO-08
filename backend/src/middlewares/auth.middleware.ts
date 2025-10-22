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
  console.log('🔐 Auth middleware - Header:', authHeader);
  
  if (!authHeader?.startsWith("Bearer ")) {
    console.log('❌ Auth middleware - No Bearer token');
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];
  console.log('🔐 Auth middleware - Token:', token.substring(0, 20) + '...');
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    console.log('✅ Auth middleware - Token válido:', { id: decoded.id, email: decoded.email, role: decoded.role });
    req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    next();
  } catch (error) {
    console.log('❌ Auth middleware - Token inválido:', error);
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}

export function authorize(...roles: ("USUARIO" | "ADMINISTRADOR")[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('🔒 Authorize middleware - Roles requeridos:', roles);
    console.log('🔒 Authorize middleware - Usuario:', req.user);
    
    if (!req.user) {
      console.log('❌ Authorize middleware - No hay usuario');
      return res.status(401).json({ error: "No autenticado" });
    }

    const normalize = (r?: string) => {
      if (!r) return r;
      const s = String(r).toUpperCase();
      if (s === 'ADMIN' || s === 'ADMINISTRADOR') return 'ADMINISTRADOR';
      if (s === 'USER' || s === 'USUARIO') return 'USUARIO';
      return s;
    };

    const allowed = roles.map(normalize);
    const userRole = normalize(req.user.role);
    
    console.log('🔒 Authorize middleware - Roles permitidos:', allowed);
    console.log('🔒 Authorize middleware - Rol del usuario:', userRole);

    if (!allowed.includes(userRole)) {
      console.log('❌ Authorize middleware - Acceso denegado');
      return res.status(403).json({ error: "No tienes permisos" });
    }
    
    console.log('✅ Authorize middleware - Acceso permitido');
    next();
  };
}
