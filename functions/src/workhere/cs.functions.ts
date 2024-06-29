// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
// import functions = require("firebase-functions");
import { getStorage, getDownloadURL } from "firebase-admin/storage";
import { logger } from "firebase-functions/v1";

// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from "firebase-admin";
admin.initializeApp();
// Create the Firebase reference to store our image data
// const db = admin.database();
// import { Storage } from "@google-cloud/storage";
import * as Busboy from "busboy";
import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import { onRequest } from "firebase-functions/v2/https";

// Your Google Cloud Platform project ID
// const projectId = "kasie2024";
const bucketName = "kasie2024.appspot.com";
// const directory = "kasieFiles";

// const directory = "kasieFiles";
const mm = "🍎 🍎 uploadFilesToCloudStorage 🍎 🍎";
// Creates a client
const storage = getStorage();
/**
 * Parses a 'multipart/form-data' upload request
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */

// Node.js doesn't have a built-in multipart/form-data parsing library.
// Instead, we can use the 'busboy' library from NPM to parse these requests.

export const uploadFileZ = onRequest(async (req, res) => {
  logger.log(`${mm} ... 🍎 🍎 🍎 🍎 🍎 🍎 🍎 ... starting ...`);
  const busboy = Busboy({ headers: req.headers });
  const tmpdir = os.tmpdir();

  const fields: { [key: string]: any } = {}; // Declare fields as an object with string keys
  const uploads: { [key: string]: any } = {};

  // This code will process each non-file field in the form.
  busboy.on("field", (fieldName, val) => {
    logger.log(
      `${mm} busboy.on field; 🔵 Processing field ${fieldName}: ${val}.`
    );
    fields[fieldName] = val;
  });

  const fileWrites: any[] = [];
  const urls: any[] = [];

  // This code will process each file uploaded.
  busboy.on("file", (fieldName, file, filename) => {
    // Note: os.tmpdir() points to an in-memory file system on GCF
    // Thus, any files in it must fit in the instance's memory.
    logger.log(
      `${mm} .. busboy.on file: 🔵 Processing file: ${filename.filename}`
    );

    const filepath = path.join(tmpdir, filename.filename);
    uploads[filename.filename] = filepath;
    const writeStream = fs.createWriteStream(filepath);
    file.pipe(writeStream);

    // File was processed by Busboy; wait for it to be written to disk.
    const promise = new Promise((resolve, reject) => {
      file.on("end", () => {
        writeStream.end();
      });
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });
    fileWrites.push(promise);
    logger.log(`${mm} .. busboy.on file: 🔵 promises ${fileWrites.length}`);
  });

  logger.info(
    `${mm} uploads: 🔼 🔼 🔵 ${JSON.stringify(uploads)} .... about to finish `
  );
  // Triggered once all uploaded files are processed by Busboy.
  // We still need to wait for the disk writes (saves) to complete.
  busboy.on("finish", async () => {
    await Promise.all(fileWrites);
    logger.log(
      `${mm} busboy.on finish: 🔼 🔵 about to process all files. ${JSON.stringify(
        uploads
      )}`
    );
    for (const name in uploads) {
      const file = uploads[name];
      await upload2bucket(urls, file, name);
    }
    res.status(200).send(urls);
  });

  busboy.end(req.rawBody);
});

async function upload2bucket(urls: any[], file: any, name: any) {
  logger.log(
    `${mm} upload2bucket: 🚺 🚺 🚺 🚺 🚺 🚺  about to upload2bucket, urls ${urls.length} name: ${name}`
  );
  const fileRes = await storage.bucket(bucketName).upload(file);
  const fileRef = storage.bucket(bucketName).file(`${name}`);
  const downloadURL = await getDownloadURL(fileRef);
  logger.log(`${mm} downloadURL: 🥦🥦🥦 🔵 ${downloadURL}`);
  urls.push({
    name: name,
    url: downloadURL,
  });
  logger.log(`${mm} download urls: 🥦 🔵 ${JSON.stringify(urls)}`);
  fs.unlinkSync(file);
  logger.log(`${mm} Processed file: 🍎 ${fileRes[0].name} 🍎`);
  //res.send(fileRes);
}
