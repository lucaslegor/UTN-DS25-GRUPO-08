import { NextFunction, Request, Response } from "express";

export function logRequest(req: Request, _res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
}
