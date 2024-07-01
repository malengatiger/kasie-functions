"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDispatchRecordsByMarshal = exports.findDispatchRecordsByAssociation = exports.findDispatchRecordsByVehicle = exports.createDispatchRecord = void 0;
const config_1 = require("../database/config");
const error_api_1 = require("./error.api");
const mm = "dispatch.api";
const dbName = "kasie_transie";
async function createDispatchRecord(dispatchRecord) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection("DispatchRecord").insertOne(dispatchRecord);
        console.log(`${mm} 🍎🍎🍎 createDispatchRecord done: 🥬 ${result.insertedId} associations 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
        (0, error_api_1.handleError)(`createCar: ${e}`, {
            vehicleId: dispatchRecord.vehicleId,
        });
        throw new Error(`createCar: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
}
exports.createDispatchRecord = createDispatchRecord;
//
async function findDispatchRecordsByVehicle(vehicleId, fromDate, toDate) {
    let result = [];
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        const list = await db
            .collection("DispatchRecord")
            .find({ vehicleId: vehicleId, created: { $gte: fromDate, $lt: toDate } })
            .toArray();
        build(list, result);
        console.log(`${mm} 🍎🍎🍎 getDispatchRecordsByVehicleId found: 
      🥬 ${result.length} records 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
        (0, error_api_1.handleError)(`findDispatchRecordsByVehicle: ${e}`, {
            vehicleId: vehicleId,
        });
        throw new Error(`findDispatchRecordsByVehicle: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
    return result;
}
exports.findDispatchRecordsByVehicle = findDispatchRecordsByVehicle;
async function findDispatchRecordsByAssociation(associationId, fromDate, toDate) {
    let result = [];
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        const list = await db
            .collection("DispatchRecord")
            .find({
            associationId: associationId,
            created: { $gte: fromDate, $lt: toDate },
        })
            .toArray();
        build(list, result);
        console.log(`${mm} 🍎🍎🍎 findDispatchRecordsByAssociationId found: 
      🥬 ${result.length} records 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
        (0, error_api_1.handleError)(`findDispatchRecordsByAssociation: ${e}`, {
            associationId: associationId,
        });
        throw new Error(`findDispatchRecordsByAssociation: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
    return result;
}
exports.findDispatchRecordsByAssociation = findDispatchRecordsByAssociation;
async function findDispatchRecordsByMarshal(userId, fromDate, toDate) {
    let result = [];
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        const list = await db
            .collection("DispatchRecord")
            .find({ marshalId: userId, created: { $gte: fromDate, $lt: toDate } })
            .toArray();
        build(list, result);
        console.log(`${mm} 🍎🍎🍎 findDispatchRecordsByMarshal found: 
      🥬 ${result.length} records 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
        (0, error_api_1.handleError)(`findDispatchRecordsByMarshal: ${e}`, {});
        throw new Error(`findDispatchRecordsByMarshal: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
    return result;
}
exports.findDispatchRecordsByMarshal = findDispatchRecordsByMarshal;
function build(list, records) {
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
//# sourceMappingURL=dispatch.api.js.map