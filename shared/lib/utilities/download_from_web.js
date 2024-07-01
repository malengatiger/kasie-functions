"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFileByUrl = void 0;
const v1_1 = require("firebase-functions/v1");
const https = require("https");
const yy = "💦 💦 downloadUsingUrl 💦 💦";
// The Firebase Admin SDK to access the Firebase Realtime Database.
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
//# sourceMappingURL=download_from_web.js.map