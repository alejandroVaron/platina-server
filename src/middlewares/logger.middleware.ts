import { Request, Response, NextFunction } from "express";

export const loggerMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.url} peticion -> `);
  next();
};
