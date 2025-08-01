import { z } from "zod";

export const feedQuerySchema = z.object({
  page: z.string().regex(/^\d+$/, "Debe ser un número").transform(Number),
  limit: z.string().regex(/^\d+$/, "Debe ser un número").transform(Number),
});

export const commentQuerySchema = z.object({
  id: z.string().regex(/^\d+$/, "Debe ser un número").transform(Number),
  page: z.string().regex(/^\d+$/, "Debe ser un número").transform(Number),
  limit: z.string().regex(/^\d+$/, "Debe ser un número").transform(Number),
});
