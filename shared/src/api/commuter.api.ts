import { Db, InsertOneResult } from "mongodb";
import { client } from "../database/config";
import {
  makeCommuterQRCode,
} from "../utilities/upload_to_bucket";
import { Commuter } from "../models/Commuter";
import { handleError } from "./error.api";
import { CommuterResponse } from "../models/CommuterResponse";

const mm = "🍎🍎🍎 vehicle.api";
const dbName = "kasie_transie";
const commuterRequestCollection = "CommuterRequest";
const commuterResponseCollection = "CommuterResponse";

const commuterCollection = "Commuter";

export async function updateCommuterQRCode(
  commuterId: string,
  qrCodeUrl: string
): Promise<any> {
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
    handleError(`updateCommuterQRCode: ${e}`, {});
    throw new Error(`updateCommuterQRCode: ${e}`);
  } finally {
    await client.close();
  }
}
export async function createCommuter(commuter: Commuter): Promise<Commuter> {
  let result: InsertOneResult;
  const resp = <Commuter>{};

  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection(commuterCollection).insertOne(commuter);
    console.log(
      `${mm} 🍎🍎🍎 createCommuter done: 🥬 ${JSON.stringify(
        result
      )} 🥬}  ... get commuter qrCode ... 🥬🥬 `
    );
    const qrCodeUrl = await makeCommuterQRCode(
      commuter.commuterId,
      commuter.email
    );

    await updateCommuterQRCode(commuter.commuterId, qrCodeUrl);

    resp.commuterId = commuter.commuterId;
    resp.email = commuter.email;
    resp.qrCodeUrl = qrCodeUrl;
    resp.name = commuter.name;
    resp.countryId = commuter.countryId;
    resp.cellphone = commuter.cellphone;
    resp.profileThumbnail = commuter.profileThumbnail;
    resp.profileUrl = commuter.profileUrl;

    return resp;
  } catch (e) {
    console.error(e);
    handleError(`createCommuter: ${e}`, {});
    throw new Error(`createCommuter: ${e}`);
  } finally {
    await client.close();
  }
  return resp;
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
    handleError(`createCommuterRequest: ${e}`, {});
    throw new Error(`createCommuterRequest: ${e}`);
  } finally {
    await client.close();
  }
}
export async function createCommuterResponse(rec: CommuterResponse): Promise<any> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection(commuterResponseCollection).insertOne(rec);
    console.log(
      `${mm} 🍎🍎🍎 createCommuterResponse done: 🥬 ${JSON.stringify(
        result
      )} 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
    handleError(`createCommuterResponse: ${e}`, {});
    throw new Error(`createCommuterResponse: ${e}`);
  } finally {
    await client.close();
  }
}
