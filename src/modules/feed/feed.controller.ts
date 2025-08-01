import { Request, Response } from "express";
import FeedService from "@modules/feed/feed.service";
import { successResponse, errorResponse } from "@utils/handleResponse";

export default class FeedController {
  static async getFeed(_req: Request, res: Response) {
    try {
      const page = parseInt(_req.query.page as string) || 0;
      const limit = parseInt(_req.query.limit as string) || 10;

      const feed = FeedService.getFeed(page, limit);
      
      return successResponse(res, "Datos obtenidos", 200, {data: feed, total: 50});
    } catch (err) {
      return errorResponse(res, "Error al obtener el feed", 500);
    }
  }

  static async getComments(_req: Request, res: Response) {
    try {
      const page = parseInt(_req.query.page as string) || 0;
      const limit = parseInt(_req.query.limit as string) || 10;

      const feed = await FeedService.getComments(page, limit);
      
      return successResponse(res, "Datos obtenidos", 200, feed);
    } catch (err) {
      return errorResponse(res, "Error al obtener el feed", 500);
    }
  }
}
