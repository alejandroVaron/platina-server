import { Router } from "express";
import MediaController from "@modules/media/media.controller";
import { validate } from "@middlewares/validateJson";
import { mediaQuerySchema } from "@modules/media/media.schema";
import { authMiddleware } from "@middlewares/auth.middleware";

const mediaRouter = Router();

mediaRouter.post("/", validate(mediaQuerySchema, "query"), authMiddleware, MediaController.generateUploadURL);

export default mediaRouter;
