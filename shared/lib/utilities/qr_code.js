"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVehicleQRCode = void 0;
const QRCode = require("qrcode");
const storage_1 = require("@google-cloud/storage");
const mm = " 🎽 🎽 QRCode 🎽 🎽 ";
const storage = new storage_1.Storage();
const bucketName = "kasie2024.appspot.com";
async function generateVehicleQRCode(vehicleId, vehicleReg, associationId, associationName) {
    console.log(`${mm} generateVehicleQRCode .... `);
    // Generate the QR code as a PNG buffer directly
    const buffer = await QRCode.toBuffer(`${vehicleId} ${vehicleReg} ${associationId} ${associationName}`, { type: "png" } // Specify the output format as PNG
    );
    console.log(`${mm} qrCodeImage: ${buffer.byteLength} png bytes`); // Log the buffer
    const fileName = `qr_code_${vehicleId}.png`; // Create a unique file name
    const file = storage.bucket(bucketName).file(fileName);
    // Upload the buffer to Cloud Storage
    await file.save(buffer);
    // Get the public download URL
    const [url] = await file.getSignedUrl({
        action: "read",
        expires: "03-09-2491", // Set a long expiration date
    });
    console.log(`${mm} QR code URL: ${url}`);
    return url;
}
exports.generateVehicleQRCode = generateVehicleQRCode;
//# sourceMappingURL=qr_code.js.map