import { Router } from "express";
import FeedController from "@modules/feed/feed.controller";
import { validate } from "@middlewares/validateJson";
import { feedQuerySchema, commentQuerySchema } from "@modules/feed/feed.schema";
import { authMiddleware } from "@middlewares/auth.middleware";

const feedRouter = Router();

feedRouter.get("/", validate(feedQuerySchema, "query"), authMiddleware, FeedController.getFeed);

feedRouter.get("/comments", validate(commentQuerySchema, "query"), authMiddleware, FeedController.getComments);

export default feedRouter;
