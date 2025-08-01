import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "@lib/s3";

export default class MediaService {
  static async generateUploadURL(key: string, contentType: string) {
    const params: PutObjectCommandInput = {
      Bucket: process.env.S3_BUCKET!,
      Key: key,
      ContentType: contentType,
      ACL: "public-read",
    };

    const command = new PutObjectCommand(params);
    const url = await getSignedUrl(s3, command, { expiresIn: 60 });
    return url;
  }
}
