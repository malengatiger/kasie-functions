import { Db, InsertOneResult } from "mongodb";
import { client } from "../database/config";
const mm = "vehicle.api";
const dbName = "kasie_transie";
const heartbeatCollection = "VehicleHeartbeat";
const photoCollection = "VehiclePhoto";
const videoCollection = "VehicleVideo";
const arrivalCollection = "VehicleArrival";
const departureCollection = "VehicleDeparture";




export async function createHeartbeat(rec:any ): Promise<any> {
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
    result = await db.collection(
      departureCollection
    ).insertOne(rec);
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
export async function findVehiclePhotos(
  vehicleId: string
): Promise<any[]> {
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


