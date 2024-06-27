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
export async function findDispatchRecordsByVehicleId(vehicleId: string): Promise<any[]> {
  let result: any[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection("DispatchRecord").find({vehicleId: vehicleId}).toArray();
    console.log(
      `${mm} 🍎🍎🍎 getDispatchRecordsByVehicleId found: 🥬 ${result.length} records 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
  return result;
}
