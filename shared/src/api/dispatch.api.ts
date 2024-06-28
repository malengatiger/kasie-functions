import { Db, InsertOneResult } from "mongodb";
import { client } from "../database/config";
const mm = "dispatch.api";
const dbName = "kasie_transie";

export async function createDispatchRecord(rec:any ): Promise<any> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);    
    result = await db.collection("DispatchRecord").insertOne(rec);
    console.log(
      `${mm} 🍎🍎🍎 createDispatchRecord done: 🥬 ${result.insertedId} associations 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
//
export async function findDispatchRecordsByVehicle(
  vehicleId: string, fromDate: string, toDate: string
): Promise<any[]> {
  let result: any[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db
      .collection("DispatchRecord")
      .find({ vehicleId: vehicleId, created: { $gte: fromDate, $lt: toDate } })
      .toArray();
    console.log(
      `${mm} 🍎🍎🍎 getDispatchRecordsByVehicleId found: 
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

export async function findDispatchRecordsByAssociation(
  associationId: string,
  fromDate: string,
  toDate: string
): Promise<any[]> {
  let result: any[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db
      .collection("DispatchRecord")
      .find({
        associationId: associationId,
        created: { $gte: fromDate, $lt: toDate },
      })
      .toArray();
    console.log(
      `${mm} 🍎🍎🍎 findDispatchRecordsByAssociationId found: 
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
export async function findDispatchRecordsByMarshal(
  userId: string,
  fromDate: string,
  toDate: string
): Promise<any[]> {
  let result: any[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db
      .collection("DispatchRecord")
      .find({ marshalId: userId, created: { $gte: fromDate, $lt: toDate } })
      .toArray();
    console.log(
      `${mm} 🍎🍎🍎 findDispatchRecordsByMarshal found: 
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
