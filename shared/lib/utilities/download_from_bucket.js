"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFileByUrl = exports.downloadFileByNameFromBucket = void 0;
const storage_1 = require("firebase-admin/storage");
const v1_1 = require("firebase-functions/v1");
const xx = "🔵 🔵 downloadFileByNameFromBucket 🔵 🔵";
// Creates a client
async function downloadFileByNameFromBucket(fileName) {
    v1_1.logger.info(`${xx} starting downloadFile : ${fileName}`);
    try {
        // Download the file
        const storage = (0, storage_1.getStorage)();
        const file = storage.bucket().file(fileName);
        // Send the file content
        const f = await file.download();
        const buffer = f[0];
        v1_1.logger.info(`${xx} Send the file content to caller, byteLength : ${buffer.byteLength} `);
        return buffer;
    }
    catch (error) {
        v1_1.logger.error(`${xx} Error downloading file: ${JSON.stringify(error)}`);
        throw new Error(`Error downloading file: ${JSON.stringify(error)}`);
    }
}
exports.downloadFileByNameFromBucket = downloadFileByNameFromBucket;
;
const https = require("https");
const yy = "🍎 🍎 downloadFileByUrl 🍎";
async function downloadFileByUrl(fileUrl) {
    v1_1.logger.info(`${yy} starting downloadUsingUrl ........... 🍐🍐 ${fileUrl}`);
    if (!fileUrl) {
        throw new Error("No file URL provided");
    }
    try {
        const fileContent = await downloadFileFromUrl(fileUrl);
        v1_1.logger.info(`${yy} downloaded : 🍐🍐 fileContent: ${fileContent.length} bytes`);
        return fileContent;
    }
    catch (error) {
        v1_1.logger.error(`${yy} Error downloading file: ${JSON.stringify(error)}`);
        throw new Error("Error downloading file");
    }
}
exports.downloadFileByUrl = downloadFileByUrl;
;
async function downloadFileFromUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            const data = [];
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
//# sourceMappingURL=download_from_bucket.js.map