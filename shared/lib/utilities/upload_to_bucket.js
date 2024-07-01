"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCommuterQRCode = exports.makeUserQRCode = exports.makeRouteQRCode = exports.makeVehicleQRCode = exports.uploadToBucket = void 0;
const storage_1 = require("firebase-admin/storage");
const v1_1 = require("firebase-functions/v1");
const Busboy = require("busboy");
const os = require("os");
const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");
const vehicle_api_1 = require("../api/vehicle.api");
const commuter_api_1 = require("../api/commuter.api");
const route_api_1 = require("../api/route.api");
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
async function makeVehicleQRCode(vehicle) {
    v1_1.logger.log(`🍎 🍎 🍎 🍎 🍎 🍎 ${xx} makeVehicleQRCode starting ...`);
    const storage = (0, storage_1.getStorage)();
    const options = {
        width: 480,
        type: "png",
    };
    const map = {
        vehicleId: vehicle.vehicleId,
        vehicleReg: vehicle.vehicleReg,
        associationId: vehicle.associationId,
        associationName: vehicle.associationName,
    };
    const buffer = await QRCode.toBuffer(`${JSON.stringify(map)}`, options);
    console.log(`${xx} qrCodeImage: ${buffer.byteLength} png bytes`); // Log the buffer
    const fileName = `${qrDir}qr_code_${vehicle.vehicleId}.png`; // Create a unique file name
    const fileRef = storage.bucket(bucketName).file(fileName);
    await fileRef.save(buffer);
    v1_1.logger.log(`${xx} qrcode image file saved: 🥦🥦🥦 🔵 ${fileName}`);
    const downloadURL = await (0, storage_1.getDownloadURL)(fileRef);
    await (0, vehicle_api_1.updateVehicleQRCodeX)(vehicle.vehicleId, downloadURL);
    console.log(`${xx} returning QR code generated: URL: 🔵🔵🔵 ${downloadURL}`);
    const resp = {};
    resp.vehicleId = vehicle.vehicleId;
    resp.vehicleReg = vehicle.vehicleReg;
    resp.associationId = vehicle.associationId;
    resp.associationName = vehicle.associationName;
    resp.qrCodeUrl = downloadURL;
    resp.countryId = vehicle.countryId;
    resp.make = vehicle.make;
    resp.model = vehicle.model;
    resp.year = vehicle.year;
    resp.ownerId = vehicle.ownerId;
    resp.ownerName = vehicle.ownerName;
    resp.active = vehicle.active;
    resp.passengerCapacity = vehicle.passengerCapacity;
    return resp;
}
exports.makeVehicleQRCode = makeVehicleQRCode;
//Route QR code
const routeDir = "kasieRouteQRCodes/";
async function makeRouteQRCode(route) {
    v1_1.logger.log(`🍎 🍎 🍎 🍎 🍎 🍎 ${xx} makeRouteQRCode starting ...`);
    const storage = (0, storage_1.getStorage)();
    const options = {
        width: 640,
        type: "png",
    };
    const map = {
        routeId: route.routeId,
        routeName: route.name,
        routeStartEnd: route.routeStartEnd,
        associationId: route.associationId,
        associationName: route.associationName,
    };
    const buffer = await QRCode.toBuffer(`${JSON.stringify(map)}`, options);
    console.log(`${xx} qrCodeImage: ${buffer.byteLength} png bytes`); // Log the buffer
    const fileName = `${routeDir}qr_code_${route.routeId}.png`; // Create a unique file name
    const fileRef = storage.bucket(bucketName).file(fileName);
    v1_1.logger.log(`${xx} Upload the buffer to Cloud Storage ... ${fileName}`);
    await fileRef.save(buffer);
    v1_1.logger.log(`${xx} qrcode image file saved: 🥦🥦🥦 🔵 ${fileRef.name}`);
    const downloadURL = await (0, storage_1.getDownloadURL)(fileRef);
    await (0, route_api_1.updateRouteQRCode)(route.routeId, downloadURL);
    console.log(`${xx} returning QR code generated: URL: 🔵🔵🔵 ${downloadURL}`);
    const resp = {};
    resp.routeId = route.routeId;
    resp.name = route.name;
    resp.routeStartEnd = route.routeStartEnd;
    resp.associationId = route.associationId;
    resp.associationName = route.associationName;
    resp.qrCodeUrl = downloadURL;
    return resp;
}
exports.makeRouteQRCode = makeRouteQRCode;
//User QR code
const userDir = "kasieUserQRCodes/";
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
//
const commuterDir = "commuterQRCodes/";
async function makeCommuterQRCode(commuterId, email) {
    if (!commuterId || !email) {
        throw new Error("Invalid input");
    }
    v1_1.logger.log(`🍎 🍎 🍎 🍎 🍎 🍎 ${xx} makeCommuterQRCode starting ...`);
    const storage = (0, storage_1.getStorage)();
    const options = {
        width: 400,
        type: "png",
    };
    const map = {
        userId: commuterId,
        email: email,
    };
    const buffer = await QRCode.toBuffer(`${JSON.stringify(map)}`, options);
    console.log(`${xx} qrCodeImage: ${buffer.byteLength} png bytes`); // Log the buffer
    const fileName = `${commuterDir}qr_code_${commuterId}.png`; // Create a unique file name
    const fileRef = storage.bucket(bucketName).file(fileName);
    v1_1.logger.log(`${xx} Upload the buffer to Cloud Storage ... ${fileName}`);
    await fileRef.save(buffer);
    v1_1.logger.log(`${xx} qrcode image file saved: 🥦🥦🥦 🔵 ${fileRef.name}`);
    const downloadURL = await (0, storage_1.getDownloadURL)(fileRef);
    await (0, commuter_api_1.updateCommuterQRCode)(commuterId, downloadURL);
    console.log(`${xx} returning QR code generated: URL: 🔵🔵🔵 ${downloadURL}`);
    return downloadURL;
}
exports.makeCommuterQRCode = makeCommuterQRCode;
//# sourceMappingURL=upload_to_bucket.js.map