import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function handleError(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: "Validación inválida", issues: err.flatten() });
  }
  const status = err?.status || 500;
  res.status(status).json({ message: err?.message || "Error interno" });
}
