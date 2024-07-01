import { Db, InsertOneResult } from "mongodb";
import { client } from "../database/config";
import { makeVehicleQRCode } from "../utilities/upload_to_bucket";
import { Vehicle } from "../models/Vehicle";
import { handleError } from "./error.api";
import { VehicleHeartbeat } from "../models/VehicleHeartbeat";
import { VehicleArrival } from "../models/VehicleArrival";
import { VehicleDeparture } from "../models/VehicleDeparture";
import { VehiclePhoto } from "../models/VehiclePhoto";
import { VehicleVideo } from "../models/VehicleVideo";
import { sendVehicleArrivalMessageApi, sendVehicleDepartureMessageApi, sendVehicleHeartbeatMessageApi } from "./fcm.messaging.api";

const mm = "🍎🍎🍎 vehicle.api";
const dbName = "kasie_transie";
const heartbeatCollection = "VehicleHeartbeat";
const photoCollection = "VehiclePhoto";
const vehicleCollection = "Vehicle";

const videoCollection = "VehicleVideo";
const arrivalCollection = "VehicleArrival";
const departureCollection = "VehicleDeparture";

export async function updateVehicleQRCodeX(
  vehicleId: string,
  qrCodeUrl?: string
): Promise<any> {
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
    console.error(e);
    handleError(`updateVehicleQRCodeX: ${e}`, {
      vehicleId: vehicleId,
    });
    throw new Error(`updateVehicleQRCodeX: ${e}`);
  } finally {
    await client.close();
  }
}
export async function createCar(car: Vehicle): Promise<Vehicle> {
  let result: InsertOneResult;
  let mCar = <Vehicle>{};
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection("Vehicle").insertOne(car);
    console.log(
      `${mm} 🍎🍎🍎 createCar done: 🥬 ${JSON.stringify(
        result
      )} 🥬}  ... get car qrCode ... 🥬🥬 `
    );
    const m = await makeVehicleQRCode(car);
    await updateVehicleQRCodeX(car.vehicleId, m.qrCodeUrl);
    mCar = {
      vehicleId: car.vehicleId,
      vehicleReg: car.vehicleReg,
      associationId: car.associationId,
      associationName: car.associationName,
      qrCodeUrl: m.qrCodeUrl,
      active: 0,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      countryId: car.countryId,
      dateInstalled: "",
      _id: result.insertedId,
      _partitionKey: car.associationId,
      make: car.make,
      model: car.model,
      year: car.year,
      passengerCapacity: car.passengerCapacity,
      ownerId: car.ownerId,
      ownerName: car.ownerName,
    };
    return mCar;
  } catch (e) {
    console.error(e);
    handleError(`createCar: ${e}`, {
      vehicleId: car.vehicleId,
    });
    throw new Error(`createCar: ${e}`);
  } finally {
    await client.close();
  }
  return mCar;
}
export async function createHeartbeat(
  heartbeat: VehicleHeartbeat
): Promise<any> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection(heartbeatCollection).insertOne(heartbeat);
    sendVehicleHeartbeatMessageApi(heartbeat);
    console.log(
      `${mm} 🍎🍎🍎 createHeartbeat done: 🥬 ${JSON.stringify(result)} 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
    handleError(`createHeartbeat: ${e}`, {
      vehicleId: heartbeat.vehicleId,
    });
    throw new Error(`createHeartbeat: ${e}`);
  } finally {
    await client.close();
  }
}
export async function createVehicleArrival(
  arrival: VehicleArrival
): Promise<any> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection(arrivalCollection).insertOne(arrival);
    sendVehicleArrivalMessageApi(arrival);
    console.log(
      `${mm} 🍎🍎🍎 createVehicleArrival done: 🥬 ${JSON.stringify(
        result
      )} 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
    handleError(`createVehicleArrival: ${e}`, {
      vehicleId: arrival.vehicleId,
    });
    throw new Error(`createVehicleArrival: ${e}`);
  } finally {
    await client.close();
  }
}
export async function createVehicleDeparture(
  departure: VehicleDeparture
): Promise<InsertOneResult> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection(departureCollection).insertOne(departure);
    sendVehicleDepartureMessageApi(departure);
    console.log(
      `${mm} 🍎🍎🍎 createVehicleDeparture done: 🥬 ${JSON.stringify(
        result
      )} 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
    handleError(`createVehicleDeparture: ${e}`, {
      vehicleId: departure.vehicleId,
    });
    throw new Error(`createVehicleDeparture: ${e}`);
  } finally {
    await client.close();
  }
}
export async function createVehiclePhoto(
  photo: VehiclePhoto
): Promise<InsertOneResult> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection(photoCollection).insertOne(photo);
    console.log(
      `${mm} 🍎🍎🍎 createVehiclePhoto done: 🥬 ${JSON.stringify(
        result
      )} 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
    handleError(`createVehiclePhoto: ${e}`, {
      vehicleId: photo.vehicleId,
    });
    throw new Error(`createVehiclePhoto: ${e}`);
  } finally {
    await client.close();
  }
}
export async function createVehicleVideo(
  video: VehicleVideo
): Promise<InsertOneResult | undefined> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection(videoCollection).insertOne(video);
    console.log(
      `${mm} 🍎🍎🍎 createVehicleVideo done: 🥬 ${JSON.stringify(
        result
      )} 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
    handleError(`createVehicleVideo: ${e}`, {
      vehicleId: video.vehicleId,
    });
    throw new Error(`createVehicleVideo: ${e}`);
  } finally {
    await client.close();
  }
  return undefined;
}
export async function findVehicleById(vehicleId: string): Promise<Vehicle> {
  let result: any[] = [];
  const vehicle = <Vehicle>{};

  try {
    await client.connect();
    const db: Db = client.db(dbName);
    const car = await db
      .collection(vehicleCollection)
      .findOne({ vehicleId: vehicleId });
    console.log(
      `${mm} 🍎🍎🍎 findVehicleById found: 
      🥬 ${result.length} records 🥬 🥬 `
    );
    if (car !== null) {
      vehicle.vehicleId = car.vehicleId;
      vehicle.vehicleReg = car.vehicleReg;
      vehicle.associationId = car.associationId;
      vehicle.associationName = car.associationName;
      vehicle.qrCodeUrl = car.qrCodeUrl;
      vehicle.active = car.active;
      vehicle.created = car.created;
      vehicle.updated = car.updated;
      vehicle.countryId = car.countryId;
      vehicle.dateInstalled = car.dateInstalled;
    }
    return vehicle;
  } catch (e) {
    console.error(e);
    handleError(`findVehicleById: ${e}`, {
      vehicleId: vehicleId,
    });
    throw new Error(`findVehicleById: ${e}`);
  } finally {
    await client.close();
  }
  return vehicle;
}
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
    handleError(`findVehiclePhotos: ${e}`, {
      vehicleId: vehicleId,
    });
    throw new Error(`findVehiclePhotos: ${e}`);
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
    handleError(`findVehicleVideos: ${e}`, {
      vehicleId: vehicleId,
    });
    throw new Error(`findVehicleVideos: ${e}`);
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
    handleError(`findVehicleHeartbeats: ${e}`, {
      vehicleId: vehicleId,
    });
    throw new Error(`findVehicleHeartbeats: ${e}`);
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
    handleError(`findVehicleArrivals: ${e}`, {
      vehicleId: vehicleId,
    });
    throw new Error(`findVehicleArrivals: ${e}`);
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
    handleError(`findVehicleDepartures: ${e}`, {
      vehicleId: vehicleId,
    });
    throw new Error(`findVehicleDepartures: ${e}`);
  } finally {
    await client.close();
  }
  return result;
}
