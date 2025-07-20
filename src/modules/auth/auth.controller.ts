// src/modules/auth/auth.controller.ts
import { Request, Response } from "express";
import AuthService from "@modules/auth/auth.service";
import { successResponse, errorResponse } from "@utils/handleResponse";

const timeoutTokenFront = 3600; // Temporalmente se setea el token para que esté habilitado una hora

export default class AuthController {

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);

    res
      .cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/api",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        status: "success",
        message: "Login exitoso",
        data: { accesstoken: result.accessToken, timeout: timeoutTokenFront},
      });
  }

  static async refreshToken(req: Request, res: Response) {
    const token = req.cookies?.refreshToken;

    if (!token) {
    return errorResponse(res, "Refresh token no enviado", 401);
  }
    const accessToken = await AuthService.refreshAccessToken(token);
    return successResponse(res, "Token generado", 200, { accessToken, timeout: timeoutTokenFront });
  }

  static async getHash(req: Request, res: Response) {
    const { password } = req.body;
    const hash = await AuthService.getHash(password);
    return successResponse(res, "Datos obtenidos", 200, hash);
  }

  static async logout(_req: Request, res: Response) {
    res.clearCookie("refreshToken", { path: "/api" });
    res.sendStatus(204);
  }
}
