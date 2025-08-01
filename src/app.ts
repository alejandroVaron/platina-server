import express from "express";
import { loggerMiddleware } from "@middlewares/logger.middleware";
import { errorHandler } from "@middlewares/errorHandler.middleware";
import pingRouter from "@modules/ping/ping.route";
import authRouter from "@modules/auth/auth.routes";
import feedRouter from "@modules/feed/feed.routes";
import mediaRouter from "@modules/media/media.routes";
import cors from "cors";
// GRAPHQL
import { authMiddlewareGraphql } from "@graphql/auth.middleware";
import { createYoga } from "graphql-yoga";
import { schema } from "@graphql/yoga";
import { prisma } from "@lib/prisma";

const app = express();

// Qa
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Validations
app.use(express.json());
app.use(loggerMiddleware);

// Rest
app.use("/api", pingRouter);
app.use("/api/auth", authRouter);
app.use("/api/feed", feedRouter);
app.use("/api/media", mediaRouter);

// Graphql
const yoga = createYoga({
  schema,
  context: async ({ request }) => {
    const userId = await authMiddlewareGraphql(request);

    return { prisma, userId };
  },
  graphqlEndpoint: "/graphql",
});
app.use("/graphql", yoga);

// Validations
app.use(errorHandler);

export default app;
