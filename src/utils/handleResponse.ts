import { Response } from 'express';

export function successResponse(res: Response, message: string, statusCode = 200, data = {}) {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data
  });
}

export function errorResponse(res: Response, message: string, statusCode = 400, data = null) {
  return res.status(statusCode).json({
    status: 'error',
    message,
    data
  });
}