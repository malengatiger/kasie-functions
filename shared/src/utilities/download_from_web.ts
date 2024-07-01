import { logger } from "firebase-functions/v1";
import * as https from "https";

const yy = "💦 💦 downloadUsingUrl 💦 💦";
// The Firebase Admin SDK to access the Firebase Realtime Database.

export async function downloadFileByUrl(fileUrl: string) {
  logger.info(`${yy} starting downloadUsingUrl ........... 🍐🍐 ${fileUrl}`);

  if (!fileUrl) {
    throw new Error("No file URL provided");
  }
  try {
    const fileContent = await downloadFileFromUrl(fileUrl);
    logger.info(
      `${yy} downloaded : 🍐🍐 fileContent: ${fileContent.length} bytes`
    );
    return fileContent;
  } catch (error) {
    logger.error(`${yy} Error downloading file: ${JSON.stringify(error)}`);
    throw new Error("Error downloading file");
  }
}

async function downloadFileFromUrl(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const data: Buffer[] = [];

      res.on("data", (chunk) => {
        data.push(chunk);
      });

      res.on("end", () => {
        const buffer = Buffer.concat(data);
        resolve(buffer);
      });

      res.on("error", (error) => {
        reject(error);
      });
    });
  });
}
