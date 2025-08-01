import { Request, Response } from "express";
import MediaService from "@modules/media/media.service";

export default class MediaController {
  static async generateUploadURL(_req: Request, res: Response) {
    const { fileName, contentType } = await _req.body.json();

    const key = `avatars/${Date.now()}-${fileName}`;
    const url = await MediaService.generateUploadURL(key, contentType);

    return new Response(JSON.stringify({ url, key }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
