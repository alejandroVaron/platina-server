import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_ACCESS_SECRET || "default_secret";

export const authMiddlewareGraphql = async (req: Request) => {
  // Headers en graphql-yoga usan .get()
  const authHeader = req.headers.get("authorization");

  // Refresh token: viene por header
  const tokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  // Access token: viene por cookie
  const cookieHeader = req.headers.get("cookie");
  const cookies = cookieHeader ? parse(cookieHeader) : {};
  const tokenFromCookie = cookies.accessToken;

  const token = tokenFromHeader || tokenFromCookie;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.sub?? null;
  } catch (err) {
    console.log("Token inválido en graphql:", err);
    return null;
  }
};
