// src/middlewares/validate.ts
import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validate =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const formatted = result.error.format();
      return res.status(400).json({
        status: "error",
        message: "Body inválido.",
        errors: formatted,
      });
    }
    req.body = result.data;
    next();
  };
