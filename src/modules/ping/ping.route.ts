import { Router } from "express";
import { pingController, pingUserController } from "@modules/ping/ping.controller";
import { authMiddleware } from "@middlewares/auth.middleware";

const router = Router();

router.get("/ping", authMiddleware, pingController);

router.get("/ping/users", authMiddleware, pingUserController);

export default router;
