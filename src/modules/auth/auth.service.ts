// src/modules/auth/auth.service.ts
import jwt from "jsonwebtoken";
import { prisma } from "@lib/prisma";
import { hash, verifyHash } from "@utils/handleEncript";
import { ApiError } from "@utils/apiError";

const db = prisma;

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET!;

const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

export default class AuthService {
  static async login(email: string, password: string) {
    const user = await db.user.findUnique({ where: { email } });

    if (!user) throw new ApiError(401, "Usuario o contraseña incorrecta.");

    const passwordValid = await verifyHash(user.password, password);
    if (!passwordValid) throw new ApiError(401, "Usuario o contraseña incorrecta.");

    const accessToken = this.generateAccessToken(
      user.id,
      user.email,
      user.username
    );
    const refreshToken = this.generateRefreshToken(
      user.id,
      user.email,
      user.username
    );

    return { accessToken, refreshToken };
  }

  static async refreshAccessToken(refreshToken: string) {
    try {
      const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as {
        sub: string;
      };
      const user = await db.user.findUnique({ where: { id: payload.sub } });
      if (!user) throw new ApiError(401, "Usuario no encontrado.");

      return this.generateAccessToken(user.id, user.email, user.username);
    } catch (err) {
      throw new ApiError(401, "Credenciales inválidas.");
    }
  }

  static async getHash(text: string) {
    return await hash(text);
  }

  static generateAccessToken(userId: string, email: string, username: string) {
    return jwt.sign(
      { sub: userId, email: email, username: username },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: ACCESS_TOKEN_EXPIRY,
      }
    );
  }

  static generateRefreshToken(userId: string, email: string, username: string) {
    return jwt.sign(
      { sub: userId, email: email, username: username },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: REFRESH_TOKEN_EXPIRY,
      }
    );
  }
}
