import { Db, InsertOneResult } from "mongodb";
import { client } from "../database/config";
import { AppError } from "../models/AppError";
const mm = "dispatch.api";
const dbName = "kasie_transie";
const appErrorCollection = "AppError";

export interface ErrorOptions {
  associationId?: string;
  vehicleId?: string;
  vehicleReg?: string;
  routeId?: string;
}
export function handleError(errorMessage: string, options?: ErrorOptions) {
  const err = <AppError>{};
  err.errorMessage = errorMessage;
  err.created = new Date().toISOString();
  err.appErrorId = `${new Date().getMilliseconds()}`;

  // Check if options object is provided and assign values
  if (options) {
    err.associationId = options.associationId;
    err.vehicleId = options.vehicleId;
    err.vehicleReg = options.vehicleReg;
    err.routeId = options.routeId;
  }

  createAppError(err);
}
export async function createAppError(
  rec: AppError
): Promise<InsertOneResult | undefined> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection(appErrorCollection).insertOne(rec);
    console.log(
      `${mm} 🍎🍎🍎 createAppError done: 🥬 ${JSON.stringify(result)} 🥬 🥬 `
    );
    //todo - send error to FCM
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
  return undefined;
}
//
export async function findAssociationAppErrors(
  associationId: string,
  fromDate: string,
  toDate: string
): Promise<any[]> {
  let result: any[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db
      .collection(appErrorCollection)
      .find({
        associationId: associationId,
        created: { $gte: fromDate, $lt: toDate },
      })
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

export async function findAllAppErrors(
  fromDate: string,
  toDate: string
): Promise<any[]> {
  let result: any[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db
      .collection(appErrorCollection)
      .find({
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
