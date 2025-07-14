import { Request, Response, NextFunction } from "express";
import { errorResponse } from "@utils/handleResponse";
import { ApiError } from "@utils/apiError";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ApiError) {
    return errorResponse(res, err.message, err.statusCode);
  }
  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";
  errorResponse(res, message, status);
};
