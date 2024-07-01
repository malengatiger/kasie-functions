import { Db, InsertOneResult } from "mongodb";
import { client } from "../database/config";
import { makeUserQRCode } from "../utilities/upload_to_bucket";

const mm = "🍎🍎🍎 vehicle.api";
const dbName = "kasie_transie";
const commuterRequestCollection = "CommuterRequest";
const commuterResponseCollection = "CommuterResponse";

const commuterCollection = "Commuter";

export async function updateCommuter(commuterId: string, qrCodeUrl: string): Promise<any> {
  try {
    console.log(
      `${mm} updateCommuter: ${commuterId} 🎲 qrCodeUrl: ${qrCodeUrl}`
    );
    await client.connect();
    const db: Db = client.db(dbName);
    const filter = { commuterId: commuterId };
    const options = { upsert: false };
    const updateDoc = {
      $set: {
        qrCodeUrl: qrCodeUrl,
      },
    };
    // Update the first document that matches the filter
    const commuters = db.collection(commuterCollection);
    const result = await commuters.updateOne(filter, updateDoc, options);

    console.log(
      `${mm} ${result.matchedCount} Commuter(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
export async function createCommuter(commuter: any): Promise<any> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection(commuterCollection).insertOne(commuter);
    console.log(
      `${mm} 🍎🍎🍎 createCommuter done: 🥬 ${JSON.stringify(
        result
      )} 🥬}  ... get commuter qrCode ... 🥬🥬 `
    );
    const qrCodeUrl = await makeUserQRCode(
      commuter.commuterId,
      commuter.email,
    );
    await updateCommuter(commuter.commuterId, qrCodeUrl);
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
export async function createCommuterRequest(rec: any): Promise<any> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection(commuterRequestCollection).insertOne(rec);
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
export async function createCommuterResponse(rec: any): Promise<any> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection(commuterResponseCollection).insertOne(rec);
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