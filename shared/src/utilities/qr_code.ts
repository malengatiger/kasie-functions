import * as QRCode from "qrcode";
import { Storage } from "@google-cloud/storage";

const mm = " 🎽 🎽 QRCode 🎽 🎽 ";
const storage = new Storage();
const bucketName = "kasie2024.appspot.com"; 


export async function generateVehicleQRCode(
  vehicleId: string,
  vehicleReg: string,
  associationId: string,
  associationName: string
): Promise<string> {
  console.log(`${mm} generateVehicleQRCode .... `);

  // Generate the QR code as a PNG buffer directly
  const buffer = await QRCode.toBuffer(
    `${vehicleId} ${vehicleReg} ${associationId} ${associationName}`,
    { type: "png" } // Specify the output format as PNG
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
