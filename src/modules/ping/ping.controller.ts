import { Request, Response, NextFunction } from "express";
import {
  getPingResponse,
  getPingUserResponse,
} from "@modules/ping/ping.service";
import { successResponse, errorResponse } from "@utils/handleResponse";

export const pingController = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const message = getPingResponse();
    successResponse(res, "Servidor en linea", 200, message);
  } catch (err) {
    next(err);
  }
};

export const pingUserController = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = getPingUserResponse();
    successResponse(res, "Datos obtenidos", 200, data);
  } catch (err) {
    next(err);
  }
};
