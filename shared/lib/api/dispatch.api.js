"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDispatchRecordsByMarshal = exports.findDispatchRecordsByAssociation = exports.findDispatchRecordsByVehicle = exports.createDispatchRecord = void 0;
const config_1 = require("../database/config");
const mm = "dispatch.api";
const dbName = "kasie_transie";
async function createDispatchRecord(rec) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection("DispatchRecord").insertOne(rec);
        console.log(`${mm} 🍎🍎🍎 createDispatchRecord done: 🥬 ${result.insertedId} associations 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
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
        result = await db
            .collection("DispatchRecord")
            .find({ vehicleId: vehicleId, created: { $gte: fromDate, $lt: toDate } })
            .toArray();
        console.log(`${mm} 🍎🍎🍎 getDispatchRecordsByVehicleId found: 
      🥬 ${result.length} records 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
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
        result = await db
            .collection("DispatchRecord")
            .find({
            associationId: associationId,
            created: { $gte: fromDate, $lt: toDate },
        })
            .toArray();
        console.log(`${mm} 🍎🍎🍎 findDispatchRecordsByAssociationId found: 
      🥬 ${result.length} records 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
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
        result = await db
            .collection("DispatchRecord")
            .find({ marshalId: userId, created: { $gte: fromDate, $lt: toDate } })
            .toArray();
        console.log(`${mm} 🍎🍎🍎 findDispatchRecordsByMarshal found: 
      🥬 ${result.length} records 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await config_1.client.close();
    }
    return result;
}
exports.findDispatchRecordsByMarshal = findDispatchRecordsByMarshal;
//# sourceMappingURL=dispatch.api.js.map