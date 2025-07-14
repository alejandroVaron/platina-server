import { Router } from "express";
import AuthController from "@modules/auth/auth.controller";
import { validate } from "@middlewares/validateJson";
import { loginSchema } from "@modules/auth/auth.schema";

const authRouter = Router();
authRouter.post("/login", validate(loginSchema), AuthController.login);
authRouter.post("/refresh", AuthController.refreshToken);
authRouter.post("/logout", AuthController.logout);
// to testing
authRouter.post("/hash", validate(loginSchema), AuthController.getHash);

export default authRouter;
