
import { getStorage } from "firebase-admin/storage";
import { logger } from "firebase-functions/v1";

const xx = "🔵 🔵 downloadFileByNameFromBucket 🔵 🔵";

// Creates a client
export async function downloadFileByNameFromBucket (fileName: string)  {
  logger.info(`${xx} starting downloadFile : ${fileName}`);

  try {
    // Download the file
    const storage = getStorage();

    const file = storage.bucket().file(fileName);
    // Send the file content
    const f = await file.download();
    const buffer = f[0];
    logger.info(
      `${xx} Send the file content to caller, byteLength : ${buffer.byteLength} `
    );

    return buffer;
  } catch (error) {
    logger.error(`${xx} Error downloading file: ${JSON.stringify(error)}`);
    throw new Error(`Error downloading file: ${JSON.stringify(error)}`);
  }
};

import * as https from "https";

const yy = "🍎 🍎 downloadFileByUrl 🍎";

export async function downloadFileByUrl (fileUrl: string){
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
};

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

