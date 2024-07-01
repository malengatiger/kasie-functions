import { Db, InsertOneResult } from "mongodb";
import { client } from "../database/config";
import { handleError } from "./error.api";
import { DispatchRecord } from "../models/dispatch_record";
import { sendDispatchMessageApi } from "./fcm.messaging.api";
const mm = "dispatch.api";
const dbName = "kasie_transie";

export async function createDispatchRecord(
  dispatchRecord: DispatchRecord
): Promise<InsertOneResult> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection("DispatchRecord").insertOne(dispatchRecord);
    sendDispatchMessageApi(dispatchRecord);
    console.log(
      `${mm} 🍎🍎🍎 createDispatchRecord done: 🥬 ${result.insertedId} associations 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
    handleError(`createCar: ${e}`, {
      vehicleId: dispatchRecord.vehicleId,
    });
    throw new Error(`createCar: ${e}`);
  } finally {
    await client.close();
  }
}
//
export async function findDispatchRecordsByVehicle(
  vehicleId: string,
  fromDate: string,
  toDate: string
): Promise<DispatchRecord[]> {
  let result: DispatchRecord[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    const list = await db
      .collection("DispatchRecord")
      .find({ vehicleId: vehicleId, created: { $gte: fromDate, $lt: toDate } })
      .toArray();
      build(list, result);
    console.log(
      `${mm} 🍎🍎🍎 getDispatchRecordsByVehicleId found: 
      🥬 ${result.length} records 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
    handleError(`findDispatchRecordsByVehicle: ${e}`, {
      vehicleId: vehicleId,
    });
    throw new Error(`findDispatchRecordsByVehicle: ${e}`);
  } finally {
    await client.close();
  }
  return result;
}

export async function findDispatchRecordsByAssociation(
  associationId: string,
  fromDate: string,
  toDate: string
): Promise<DispatchRecord[]> {
  let result: DispatchRecord[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    const list = await db
      .collection("DispatchRecord")
      .find({
        associationId: associationId,
        created: { $gte: fromDate, $lt: toDate },
      })
      .toArray();
      build(list, result);
    console.log(
      `${mm} 🍎🍎🍎 findDispatchRecordsByAssociationId found: 
      🥬 ${result.length} records 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
    handleError(`findDispatchRecordsByAssociation: ${e}`, {
      associationId: associationId,
    });
    throw new Error(`findDispatchRecordsByAssociation: ${e}`);
  } finally {
    await client.close();
  }
  return result;
}
export async function findDispatchRecordsByMarshal(
  userId: string,
  fromDate: string,
  toDate: string
): Promise<DispatchRecord[]> {
  let result: DispatchRecord[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    const list = await db
      .collection("DispatchRecord")
      .find({ marshalId: userId, created: { $gte: fromDate, $lt: toDate } })
      .toArray();
      build(list, result);
    console.log(
      `${mm} 🍎🍎🍎 findDispatchRecordsByMarshal found: 
      🥬 ${result.length} records 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
    handleError(`findDispatchRecordsByMarshal: ${e}`, {});
    throw new Error(`findDispatchRecordsByMarshal: ${e}`);
  } finally {
    await client.close();
  }
  return result;
}

function build(list: any[], records: DispatchRecord[]) {
  list.forEach((record) => {
    records.push({
      dispatchRecordId: record.dispatchRecordId,
      routeLandmarkId: record.routeLandmarkId,
      marshalId: record.marshalId,
      passengers: record.passengers,
      ownerId: record.ownerId,
      created: record.created,
      position: record.position,
      dispatched: record.dispatched,
      landmarkName: record.landmarkName,
      marshalName: record.marshalName,
      routeId: record.routeId,
      vehicleId: record.vehicleId,
      vehicleArrivalId: "",
      vehicleReg: record.vehicleReg,
      associationId: record.associationId,
      associationName: record.associationName,
      
    });
  });
}
