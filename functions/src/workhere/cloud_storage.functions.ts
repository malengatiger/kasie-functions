
import { logger, Request, Response } from "firebase-functions/v1";


import { onRequest } from "firebase-functions/v2/https";
import { uploadToBucket } from "../../../shared/src/utilities/upload_to_bucket";
import {
  downloadFileByNameFromBucket,
  downloadFileByUrl,
} from "../../../shared/src/utilities/download_from_bucket";

const mm = "🍎 🍎 uploadFilesToCloudStorage 🍎 🍎";
const xx = "🔵 🔵 downloadFileFromCloudStorage 🔵 🔵";

/**
 * Uploads files to cloud storage and returns the download urls
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */

export const uploadFileZ = onRequest(async (req: Request, res: Response) => {
  logger.log(`${mm} ... 🍎 🍎 🍎 🍎 🍎 🍎 🍎 ... starting ...`);
  await uploadToBucket(req, res);
  logger.log(`${mm} ... 🍎 🍎 🍎 🍎 🍎 🍎 🍎 ... done ...`);
});

export const downloadFileByName = onRequest(async (request, response) => {
  const fileName = request.query.fileName as string; // Type assertion
  logger.info(`${xx} starting downloadFile : ${fileName}`);

  try {
    if (!fileName) {
      throw new Error("No file name provided");
    }
    const buffer = await downloadFileByNameFromBucket(fileName);
    logger.info(
      `${xx} Send the file content to caller, byteLength : ${buffer.byteLength} `
    );

    response.send(buffer);
  } catch (error) {
    logger.error(`${mm} Error downloading file: ${JSON.stringify(error)}`);
    response.status(500).send({
      error: `Error downloading file: ${error}`,
      status: 500,
      date: new Date(),
    });
  }
});

const yy = "💦 💦 downloadUsingUrl 💦 💦";

export const downloadUsingUrl = onRequest(async (request, response) => {
  const fileUrl = request.query.url as string;
  logger.info(`${yy} starting downloadUsingUrl ........... 🍐🍐 ${fileUrl}`);

  if (!fileUrl) {
    throw new Error("No file URL provided");
  }
  try {
    const fileContent = await downloadFileByUrl(fileUrl);
    logger.info(
      `${yy} downloaded : 🍐🍐 fileContent: ${fileContent.length} bytes`
    );
    response.send(fileContent);
  } catch (error) {
    logger.error(`${yy} Error downloading file: ${JSON.stringify(error)}`);
    response.status(500).send({ error: "Error downloading file" });
  }
});

export { downloadFileByNameFromBucket };
