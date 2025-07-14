// src/modules/auth/auth.controller.ts
import { Request, Response } from "express";
import AuthService from "@modules/auth/auth.service";
import { successResponse, errorResponse } from "@utils/handleResponse";

export default class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);

    res
      .cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/api/auth/refresh",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        status: "success",
        message: "Login successful",
        data: { accessToken: result.accessToken },
      });
  }

  static async refreshToken(req: Request, res: Response) {
    const token = req.cookies.refreshToken;
    const accessToken = await AuthService.refreshAccessToken(token);
    res.json({ accessToken });
  }

  static async getHash(req: Request, res: Response) {
    const { password } = req.body;
    const hash = await AuthService.getHash(password);
    return successResponse(res, "Datos obtenidos", 200, hash);
  }

  static async logout(_req: Request, res: Response) {
    res.clearCookie("refreshToken", { path: "/api/auth/refresh" });
    res.sendStatus(204);
  }
}
