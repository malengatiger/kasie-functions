import { Db, InsertOneResult } from "mongodb";
import { client } from "../database/config";
import { AmbassadorPassengerCount } from "../models/AmbassadorPassengerCount";
import { handleError } from "./error.api";
import { sendPassengerCountMessageApi } from "./fcm.messaging.api";
const mm = "ambassador.api";
const dbName = "kasie_transie";
const collection = "AmbassadorPassengerCount";

export async function createPassengerCount(
  passengerCount: AmbassadorPassengerCount
): Promise<any> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection(collection).insertOne(passengerCount);
    sendPassengerCountMessageApi(passengerCount);
    console.log(
      `${mm} 🍎🍎🍎 createPassengerCount done: 🥬 ${JSON.stringify(
        result
      )} 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
    handleError(`createPassengerCount: ${e}`, {
      associationId: passengerCount.associationId,
      vehicleId: passengerCount.vehicleId,
      vehicleReg: passengerCount.vehicleReg,
      routeId: passengerCount.routeId,
    });
    throw new Error(`createPassengerCount: ${e}`);
  } finally {
    await client.close();
  }
}
//
export async function findPassengerCountsByVehicle(
  vehicleId: string,
  fromDate: string,
  toDate: string
): Promise<AmbassadorPassengerCount[]> {
  let passengerCounts: AmbassadorPassengerCount[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    const list = await db
      .collection(collection)
      .find({ vehicleId: vehicleId, created: { $gte: fromDate, $lt: toDate } })
      .toArray();
      build(list, passengerCounts);
    console.log(
      `${mm} 🍎🍎🍎 findPassengerCountsByVehicleId found: 
      🥬 ${passengerCounts.length} records 🥬 🥬 `
    );
    return passengerCounts;
  } catch (e) {
    console.error(e);
    handleError(`findPassengerCountsByVehicle: ${e}`, {
      vehicleId: vehicleId,
    });
    throw new Error(`findPassengerCountsByVehicle: ${e}`);
  } finally {
    await client.close();
  }
  return passengerCounts;
}
function build(list: any[], passengerCounts: AmbassadorPassengerCount[]) {
  list.forEach((item) => {
        const m = <AmbassadorPassengerCount>{};
        m.associationId = item.associationId;
        m.vehicleId = item.vehicleId;
        m.vehicleReg = item.vehicleReg;
        m.routeId = item.routeId;
        m.created = item.created;
        m.currentPassengers = item.currentPassengers;
        m.passengersIn = item.passengersIn;
        m.passengersOut = item.passengersOut;
        m.routeLandmarkId = item.routeLandmarkId;
        m.routeLandmarkName = item.routeLandmarkName;
        m.position = item.position;
        m.userId = item.userId;
        m.passengerCountId = item.passengerCountId;
        passengerCounts.push(m);
      });
}
export async function findPassengerCountsByAssociation(
  associationId: string,
  fromDate: string,
  toDate: string
): Promise<any[]> {
  let passengerCounts: AmbassadorPassengerCount[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    const list = await db
      .collection(collection)
      .find({
        associationId: associationId,
        created: { $gte: fromDate, $lt: toDate },
      })
      .toArray();
      build(list, passengerCounts);
    console.log(
      `${mm} 🍎🍎🍎 findPassengerCountsByAssociation found: 
      🥬 ${list.length} records 🥬 🥬 `
    );
    return passengerCounts;
  } catch (e) {
    console.error(e);
     handleError(`findPassengerCountsByAssociation: ${e}`, {
      associationId: associationId,
    });
    throw new Error(`findPassengerCountsByAssociation: ${e}`);
  } finally {
    await client.close();
  }
  return passengerCounts;
}
export async function findPassengerCountsByAmbassador(
  userId: string,
  fromDate: string,
  toDate: string
): Promise<any[]> {
  let passengerCounts: AmbassadorPassengerCount[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    const list = await db
      .collection(collection)
      .find({ userId: userId, created: { $gte: fromDate, $lt: toDate } })
      .toArray();
      build(list, passengerCounts);
    console.log(
      `${mm} 🍎🍎🍎 findPassengerCountsByAmbassador found: 
      🥬 ${list.length} records 🥬 🥬 `
    );
    return passengerCounts;
  } catch (e) {
    console.error(e);
     handleError(`findPassengerCountsByAssociation: ${e}`, {
    });
    throw new Error(`findPassengerCountsByAssociation: ${e}`);
  } finally {
    await client.close();
  }
  return passengerCounts;
}
