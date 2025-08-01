import { z } from "zod";

export const mediaQuerySchema = z.object({
  key: z.string(),
  contentType: z.string(),
});