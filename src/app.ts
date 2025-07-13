import express from "express";
import { loggerMiddleware } from "@middlewares/logger.middleware";
import { errorHandler } from "@middlewares/errorHandler.middleware";
import pingRouter from "@modules/ping/ping.route";

const app = express();

app.use(express.json());
app.use(loggerMiddleware);

// Agrega aquí las rutas de módulos
app.use("/api", pingRouter);

// Manejador global de errores
app.use(errorHandler);

export default app;
