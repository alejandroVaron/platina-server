import express from "express";
import { loggerMiddleware } from "@middlewares/logger.middleware";
import { errorHandler } from "@middlewares/errorHandler.middleware";
import pingRouter from "@modules/ping/ping.route";
import authRouter from "@modules/auth/auth.routes";

const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.use("/api", pingRouter);
app.use("/api/auth", authRouter);

app.use(errorHandler);

export default app;
