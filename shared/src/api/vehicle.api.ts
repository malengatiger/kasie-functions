import { Db, InsertOneResult } from "mongodb";
import { client } from "../database/config";
import { makeVehicleQRCode } from "../utilities/upload_to_bucket";

const mm = "🍎🍎🍎 vehicle.api";
const dbName = "kasie_transie";
const heartbeatCollection = "VehicleHeartbeat";
const photoCollection = "VehiclePhoto";
const videoCollection = "VehicleVideo";
const arrivalCollection = "VehicleArrival";
const departureCollection = "VehicleDeparture";

export async function updateCar(vehicleId: string, qrCodeUrl: string): Promise<any> {
  try {
    console.log(`${mm} updateCar: ${vehicleId} 🎲 qrCodeUrl: ${qrCodeUrl}`);
    await client.connect();
    const db: Db = client.db(dbName);
    const filter = { vehicleId: vehicleId };
    const options = { upsert: false };
    const updateDoc = {
      $set: {
        qrCodeUrl: qrCodeUrl,
      },
    };
    // Update the first document that matches the filter
    const cars = db.collection("Vehicle");
    const result = await cars.updateOne(filter, updateDoc, options);

    console.log(
      `${mm} ${result.matchedCount} car(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
export async function createCar(car: any): Promise<any> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection("Vehicle").insertOne(car);
    console.log(
      `${mm} 🍎🍎🍎 createCar done: 🥬 ${JSON.stringify(result)} 🥬}  ... get car qrCode ... 🥬🥬 `
    );
    const qrCodeUrl = await makeVehicleQRCode(car.vehicleId, car.vehicleReg, car.associationId, car.associationName);
    await updateCar(car.vehicleId, qrCodeUrl);
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
export async function createHeartbeat(rec: any): Promise<any> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection(heartbeatCollection).insertOne(rec);
    console.log(
      `${mm} 🍎🍎🍎 createHeartbeat done: 🥬 ${JSON.stringify(result)} 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
export async function createVehicleArrival(rec: any): Promise<any> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection(arrivalCollection).insertOne(rec);
    console.log(
      `${mm} 🍎🍎🍎 createVehicleArrival done: 🥬 ${JSON.stringify(
        result
      )} 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
export async function createVehicleDeparture(rec: any): Promise<any> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection(departureCollection).insertOne(rec);
    console.log(
      `${mm} 🍎🍎🍎 createVehicleDeparture done: 🥬 ${JSON.stringify(
        result
      )} 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
export async function createVehiclePhoto(rec: any): Promise<any> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection(photoCollection).insertOne(rec);
    console.log(
      `${mm} 🍎🍎🍎 createVehiclePhoto done: 🥬 ${JSON.stringify(
        result
      )} 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
export async function createVehicleVideo(rec: any): Promise<any> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection(videoCollection).insertOne(rec);
    console.log(
      `${mm} 🍎🍎🍎 createVehicleVideo done: 🥬 ${JSON.stringify(
        result
      )} 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
//
export async function findVehiclePhotos(vehicleId: string): Promise<any[]> {
  let result: any[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db
      .collection(photoCollection)
      .find({ vehicleId: vehicleId })
      .toArray();
    console.log(
      `${mm} 🍎🍎🍎 findVehiclePhotos found: 
      🥬 ${result.length} records 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
  return result;
}
export async function findVehicleVideos(vehicleId: string): Promise<any[]> {
  let result: any[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db
      .collection(videoCollection)
      .find({ vehicleId: vehicleId })
      .toArray();
    console.log(
      `${mm} 🍎🍎🍎 findVehicleVideos found: 
      🥬 ${result.length} records 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
  return result;
}
export async function findVehicleHeartbeats(
  vehicleId: string,
  fromDate: string,
  toDate: string
): Promise<any[]> {
  let result: any[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db
      .collection(heartbeatCollection)
      .find({ vehicleId: vehicleId, created: { $gte: fromDate, $lt: toDate } })
      .toArray();
    console.log(
      `${mm} 🍎🍎🍎 findVehicleHeartbeats found: 
      🥬 ${result.length} records 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
  return result;
}

export async function findVehicleArrivals(
  vehicleId: string,
  fromDate: string,
  toDate: string
): Promise<any[]> {
  let result: any[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db
      .collection(arrivalCollection)
      .find({ vehicleId: vehicleId, created: { $gte: fromDate, $lt: toDate } })
      .toArray();
    console.log(
      `${mm} 🍎🍎🍎 findVehicleArrivals found: 
      🥬 ${result.length} records 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
  return result;
}
export async function findVehicleDepartures(
  vehicleId: string,
  fromDate: string,
  toDate: string
): Promise<any[]> {
  let result: any[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db
      .collection(departureCollection)
      .find({ vehicleId: vehicleId, created: { $gte: fromDate, $lt: toDate } })
      .toArray();
    console.log(
      `${mm} 🍎🍎🍎 findVehicleDepartures found: 
      🥬 ${result.length} records 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
  return result;
}
