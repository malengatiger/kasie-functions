"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUserQRCode = exports.makeRouteQRCode = exports.makeVehicleQRCode = exports.uploadToBucket = void 0;
const storage_1 = require("firebase-admin/storage");
const v1_1 = require("firebase-functions/v1");
const Busboy = require("busboy");
const os = require("os");
const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");
const vehicle_api_1 = require("../api/vehicle.api");
const bucketName = "kasie2024.appspot.com";
// const directory = "kasieFiles";
const mm = "🍎 🍎 uploadToBucket 🍎 🍎";
const xx = "🔵 🔵 makeQRCode 🔵 🔵";
async function uploadToBucket(req, res) {
    v1_1.logger.log(`${mm} ... 🍎 🍎 🍎 🍎 🍎 🍎 🍎 ... starting ...`);
    const busboy = Busboy({ headers: req.headers });
    const tmpdir = os.tmpdir();
    const fields = {}; // Declare fields as an object with string keys
    const uploads = {};
    // This code will process each non-file field in the form.
    busboy.on("field", (fieldName, val) => {
        v1_1.logger.log(`${mm} busboy.on field; 🔵 Processing field ${fieldName}: ${val}.`);
        fields[fieldName] = val;
    });
    const fileWrites = [];
    const urls = [];
    // This code will process each file uploaded.
    busboy.on("file", (fieldName, file, filename) => {
        // Note: os.tmpdir() points to an in-memory file system on GCF
        // Thus, any files in it must fit in the instance's memory.
        v1_1.logger.log(`${mm} .. busboy.on file: 🔵 Processing file: ${filename.filename}`);
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
        v1_1.logger.log(`${mm} .. busboy.on file: 🔵 promises ${fileWrites.length}`);
    });
    v1_1.logger.info(`${mm} uploads: 🔼 🔼 🔵 ${JSON.stringify(uploads)} .... about to finish `);
    // Triggered once all uploaded files are processed by Busboy.
    // We still need to wait for the disk writes (saves) to complete.
    busboy.on("finish", async () => {
        await Promise.all(fileWrites);
        v1_1.logger.log(`${mm} busboy.on finish: 🔼 🔵 about to process all files. ${JSON.stringify(uploads)}`);
        for (const name in uploads) {
            const file = uploads[name];
            await upload2bucket(urls, file, name);
        }
        v1_1.logger.log(`\n\n${mm} busboy.on finish: 🔼 🔵 about to return download urls. ${JSON.stringify(urls)}`);
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
exports.uploadToBucket = uploadToBucket;
const dir = "kasieMedia/";
async function upload2bucket(urls, file, name) {
    v1_1.logger.log(`${mm} upload2bucket: 🚺 🚺 🚺 🚺 🚺 🚺  about to upload2bucket, urls ${urls.length} name: ${name}`);
    const storage = (0, storage_1.getStorage)();
    const options = {
        destination: `${dir}${name}`,
    };
    const fileRes = await storage.bucket(bucketName).upload(file, options);
    const fileRef = storage.bucket(bucketName).file(`${name}`);
    const downloadURL = await (0, storage_1.getDownloadURL)(fileRef);
    v1_1.logger.log(`${xx} downloadURL: 🥦🥦🥦 🔵 ${downloadURL}`);
    urls.push({
        name: name,
        url: downloadURL,
    });
    v1_1.logger.log(`${mm} download urls: 🥦 🔵 ${JSON.stringify(urls)}`);
    fs.unlinkSync(file);
    v1_1.logger.log(`${xx} Processed file: 🍎 ${fileRes[0].name} 🍎`);
    return urls;
}
const qrDir = "kasieVehicleQRCodes/";
//
async function makeVehicleQRCode(vehicleId, vehicleReg, associationId, associationName) {
    if (!vehicleId || !vehicleReg || !associationId || !associationName) {
        throw new Error("Invalid input");
    }
    v1_1.logger.log(`🍎 🍎 🍎 🍎 🍎 🍎 ${xx} generateQRCode starting ...`);
    const storage = (0, storage_1.getStorage)();
    const options = {
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
    v1_1.logger.log(`${xx} Upload the buffer to Cloud Storage ... ${fileName}`);
    await fileRef.save(buffer);
    v1_1.logger.log(`${xx} qrcode image file saved: 🥦🥦🥦 🔵 ${fileRef.name}`);
    const downloadURL = await (0, storage_1.getDownloadURL)(fileRef);
    //todo - update vehicle ...
    await (0, vehicle_api_1.updateCar)(vehicleId, downloadURL);
    console.log(`${xx} returning QR code generated: URL: 🔵🔵🔵 ${downloadURL}`);
    return downloadURL;
}
exports.makeVehicleQRCode = makeVehicleQRCode;
const routeDir = "kasieRouteQRCodes/";
async function makeRouteQRCode(routeId, routeName) {
    if (!routeId || !routeName) {
        throw new Error("Invalid input");
    }
    v1_1.logger.log(`🍎 🍎 🍎 🍎 🍎 🍎 ${xx} makeRouteQRCode starting ...`);
    const storage = (0, storage_1.getStorage)();
    const options = {
        width: 400,
        type: "png",
    };
    const map = {
        landmarkId: routeId,
        landmarkName: routeName,
    };
    const buffer = await QRCode.toBuffer(`${JSON.stringify(map)}`, options);
    console.log(`${xx} qrCodeImage: ${buffer.byteLength} png bytes`); // Log the buffer
    const fileName = `${routeDir}qr_code_${routeId}.png`; // Create a unique file name
    const fileRef = storage.bucket(bucketName).file(fileName);
    v1_1.logger.log(`${xx} Upload the buffer to Cloud Storage ... ${fileName}`);
    await fileRef.save(buffer);
    v1_1.logger.log(`${xx} qrcode image file saved: 🥦🥦🥦 🔵 ${fileRef.name}`);
    const downloadURL = await (0, storage_1.getDownloadURL)(fileRef);
    //todo - update vehicle ...
    await (0, vehicle_api_1.updateCar)(routeId, downloadURL);
    console.log(`${xx} returning QR code generated: URL: 🔵🔵🔵 ${downloadURL}`);
    return downloadURL;
}
exports.makeRouteQRCode = makeRouteQRCode;
const userDir = 'kasieUserQRCodes/';
async function makeUserQRCode(userId, email) {
    if (!userId || !email) {
        throw new Error("Invalid input");
    }
    v1_1.logger.log(`🍎 🍎 🍎 🍎 🍎 🍎 ${xx} makeUserQRCode starting ...`);
    const storage = (0, storage_1.getStorage)();
    const options = {
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
    v1_1.logger.log(`${xx} Upload the buffer to Cloud Storage ... ${fileName}`);
    await fileRef.save(buffer);
    v1_1.logger.log(`${xx} qrcode image file saved: 🥦🥦🥦 🔵 ${fileRef.name}`);
    const downloadURL = await (0, storage_1.getDownloadURL)(fileRef);
    // await updateCommuter(userId, downloadURL);
    console.log(`${xx} returning QR code generated: URL: 🔵🔵🔵 ${downloadURL}`);
    return downloadURL;
}
exports.makeUserQRCode = makeUserQRCode;
//# sourceMappingURL=upload_to_bucket.js.map