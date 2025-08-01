import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { errorResponse } from "@utils/handleResponse";
import { ApiError } from "@utils/apiError";

type Source = "body" | "query" | "params";

export const validate =
  (schema: ZodType, source: Source = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const data = Object.assign({}, req[source]);
    const result = schema.safeParse(data);

    if (!result.success) {
      throw new ApiError(400, `Validación fallida en ${source}.`, {
        error: result.error.message,
      });
    }
    next();
  };
