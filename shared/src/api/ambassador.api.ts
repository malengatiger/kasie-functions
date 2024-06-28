import { Db, InsertOneResult } from "mongodb";
import { client } from "../database/config";
const mm = "ambassador.api";
const dbName = "kasie_transie";
const collection = "AmbassadorPassengerCount";

export async function createPassengerCount(rec: any): Promise<any> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection(collection).insertOne(rec);
    console.log(
      `${mm} 🍎🍎🍎 createPassengerCount done: 🥬 ${JSON.stringify(
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
export async function findPassengerCountsByVehicle(
  vehicleId: string,
  fromDate: string,
  toDate: string
): Promise<any[]> {
  let result: any[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db
      .collection(collection)
      .find({ vehicleId: vehicleId, created: { $gte: fromDate, $lt: toDate } })
      .toArray();
    console.log(
      `${mm} 🍎🍎🍎 findPassengerCountsByVehicleId found: 
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

export async function findPassengerCountsByAssociation(
  associationId: string,
  fromDate: string,
  toDate: string
): Promise<any[]> {
  let result: any[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db
      .collection(collection)
      .find({
        associationId: associationId,
        created: { $gte: fromDate, $lt: toDate },
      })
      .toArray();
    console.log(
      `${mm} 🍎🍎🍎 findPassengerCountsByAssociation found: 
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
export async function findPassengerCountsByAmbassador(
  userId: string,
  fromDate: string,
  toDate: string
): Promise<any[]> {
  let result: any[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);

    result = await db
      .collection(collection)
      .find({ userId: userId, created: { $gte: fromDate, $lt: toDate } })
      .toArray();
    console.log(
      `${mm} 🍎🍎🍎 findPassengerCountsByAmbassador found: 
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
