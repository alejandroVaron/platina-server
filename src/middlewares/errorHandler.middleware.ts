import { Request, Response, NextFunction } from "express";
import { errorResponse } from "@utils/handleResponse";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";
  errorResponse(res, message, status);
};
