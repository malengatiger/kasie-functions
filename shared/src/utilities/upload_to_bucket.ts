import { getStorage, getDownloadURL } from "firebase-admin/storage";
import { logger, Request, Response } from "firebase-functions/v1";

import * as Busboy from "busboy";
import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import * as QRCode from "qrcode";
import { updateCar } from "../api/vehicle.api";

const bucketName = "kasie2024.appspot.com";
// const directory = "kasieFiles";

const mm = "🍎 🍎 uploadToBucket 🍎 🍎";
const xx = "🔵 🔵 makeQRCode 🔵 🔵";

export async function uploadToBucket(
  req: Request,
  res: Response
): Promise<any[]> {
  logger.log(`${mm} ... 🍎 🍎 🍎 🍎 🍎 🍎 🍎 ... starting ...`);
  const busboy = Busboy({ headers: req.headers });
  const tmpdir = os.tmpdir();

  const fields: { [key: string]: any } = {}; // Declare fields as an object with string keys
  const uploads: { [key: string]: any } = {};

  // This code will process each non-file field in the form.
  busboy.on("field", (fieldName: string | number, val: any) => {
    logger.log(
      `${mm} busboy.on field; 🔵 Processing field ${fieldName}: ${val}.`
    );
    fields[fieldName] = val;
  });

  const fileWrites: any[] = [];
  const urls: any[] = [];

  // This code will process each file uploaded.
  busboy.on(
    "file",
    (
      fieldName: any,
      file: {
        pipe: (arg0: fs.WriteStream) => void;
        on: (arg0: string, arg1: () => void) => void;
      },
      filename: { filename: string }
    ) => {
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
    }
  );

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
    logger.log(
      `\n\n${mm} busboy.on finish: 🔼 🔵 about to return download urls. ${JSON.stringify(
        urls
      )}`
    );
    res.status(200).send(urls); // Send the urls after busboy finishes
  });

  busboy.end(req.body);
  return new Promise((resolve) => {
    // Wait for busboy to finish before resolving the promise
    busboy.on("finish", () => {
      resolve(urls);
    });
  });
}
const dir = "kasieMedia/";
async function upload2bucket(urls: any[], file: any, name: any) {
  logger.log(
    `${mm} upload2bucket: 🚺 🚺 🚺 🚺 🚺 🚺  about to upload2bucket, urls ${urls.length} name: ${name}`
  );
  const storage = getStorage();

  const options: any = {
    destination: `${dir}${name}`,
  };
  const fileRes = await storage.bucket(bucketName).upload(file, options);
  const fileRef = storage.bucket(bucketName).file(`${name}`);
  const downloadURL = await getDownloadURL(fileRef);
  logger.log(`${xx} downloadURL: 🥦🥦🥦 🔵 ${downloadURL}`);
  urls.push({
    name: name,
    url: downloadURL,
  });
  logger.log(`${mm} download urls: 🥦 🔵 ${JSON.stringify(urls)}`);
  fs.unlinkSync(file);
  logger.log(`${xx} Processed file: 🍎 ${fileRes[0].name} 🍎`);
  return urls;
}

const qrDir = "kasieVehicleQRCodes/";
//
export async function makeVehicleQRCode(
  vehicleId: string,
  vehicleReg: string,
  associationId: string,
  associationName: string
): Promise<string> {
  if (!vehicleId || !vehicleReg || !associationId || !associationName) {
    throw new Error("Invalid input");
  }
  logger.log(`🍎 🍎 🍎 🍎 🍎 🍎 ${xx} generateQRCode starting ...`);
  const storage = getStorage();

  const options: QRCode.QRCodeToBufferOptions = {
    width: 400,
    type: "png",
  };
  const map = {
    vehicleId: vehicleId,
    vehicleReg: vehicleReg,
    associationId: associationId,
    associationName: associationName,
  };
  const buffer = await QRCode.toBuffer(`${JSON.stringify(map)}`, options);

  console.log(`${xx} qrCodeImage: ${buffer.byteLength} png bytes`); // Log the buffer

  const fileName = `${qrDir}qr_code_${vehicleId}.png`; // Create a unique file name
  const fileRef = storage.bucket(bucketName).file(fileName);
  logger.log(`${xx} Upload the buffer to Cloud Storage ... ${fileName}`);
  await fileRef.save(buffer);
  logger.log(`${xx} qrcode image file saved: 🥦🥦🥦 🔵 ${fileRef.name}`);
  const downloadURL = await getDownloadURL(fileRef);

  //todo - update vehicle ...
  await updateCar(vehicleId, downloadURL);
  console.log(`${xx} returning QR code generated: URL: 🔵🔵🔵 ${downloadURL}`);
  return downloadURL;
}
const routeDir = "kasieRouteQRCodes/";

export async function makeRouteQRCode(
  routeId: string,
  routeName: string,
): Promise<string> {
  if (!routeId || !routeName ) {
    throw new Error("Invalid input");
  }
  logger.log(`🍎 🍎 🍎 🍎 🍎 🍎 ${xx} makeRouteQRCode starting ...`);
  const storage = getStorage();

  const options: QRCode.QRCodeToBufferOptions = {
    width: 400,
    type: "png",
  };
  const map = {
    landmarkId: routeId,
    landmarkName: routeName,
  };
  const buffer = await QRCode.toBuffer(
    `${JSON.stringify(map)}`,
    options 
  );

  console.log(`${xx} qrCodeImage: ${buffer.byteLength} png bytes`); // Log the buffer

  const fileName = `${routeDir}qr_code_${routeId}.png`; // Create a unique file name
  const fileRef = storage.bucket(bucketName).file(fileName);
  logger.log(`${xx} Upload the buffer to Cloud Storage ... ${fileName}`);
  await fileRef.save(buffer);
  logger.log(`${xx} qrcode image file saved: 🥦🥦🥦 🔵 ${fileRef.name}`);
  const downloadURL = await getDownloadURL(fileRef);

  //todo - update vehicle ...
  await updateCar(routeId, downloadURL);
  console.log(`${xx} returning QR code generated: URL: 🔵🔵🔵 ${downloadURL}`);
  return downloadURL;
}
const userDir = 'kasieUserQRCodes/'
export async function makeUserQRCode(
  userId: string,
  email: string
): Promise<string> {
  if (!userId || !email) {
    throw new Error("Invalid input");
  }
  logger.log(`🍎 🍎 🍎 🍎 🍎 🍎 ${xx} makeUserQRCode starting ...`);
  const storage = getStorage();

  const options: QRCode.QRCodeToBufferOptions = {
    width: 400,
    type: "png",
  };
  const map = {
    userId: userId,
    email: email,
  };
  const buffer = await QRCode.toBuffer(`${JSON.stringify(map)}`, options);

  console.log(`${xx} qrCodeImage: ${buffer.byteLength} png bytes`); // Log the buffer

  const fileName = `${userDir}qr_code_${userId}.png`; // Create a unique file name
  const fileRef = storage.bucket(bucketName).file(fileName);
  logger.log(`${xx} Upload the buffer to Cloud Storage ... ${fileName}`);
  await fileRef.save(buffer);
  logger.log(`${xx} qrcode image file saved: 🥦🥦🥦 🔵 ${fileRef.name}`);
  const downloadURL = await getDownloadURL(fileRef);

  // await updateCommuter(userId, downloadURL);
  console.log(`${xx} returning QR code generated: URL: 🔵🔵🔵 ${downloadURL}`);
  return downloadURL;
}
