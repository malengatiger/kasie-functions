"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPassengerCountsByAmbassador = exports.findPassengerCountsByAssociation = exports.findPassengerCountsByVehicle = exports.createPassengerCount = void 0;
const config_1 = require("../database/config");
const mm = "ambassador.api";
const dbName = "kasie_transie";
const collection = "AmbassadorPassengerCount";
async function createPassengerCount(rec) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection(collection).insertOne(rec);
        console.log(`${mm} 🍎🍎🍎 createPassengerCount done: 🥬 ${JSON.stringify(result)} 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await config_1.client.close();
    }
}
exports.createPassengerCount = createPassengerCount;
//
async function findPassengerCountsByVehicle(vehicleId, fromDate, toDate) {
    let result = [];
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db
            .collection(collection)
            .find({ vehicleId: vehicleId, created: { $gte: fromDate, $lt: toDate } })
            .toArray();
        console.log(`${mm} 🍎🍎🍎 findPassengerCountsByVehicleId found: 
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
exports.findPassengerCountsByVehicle = findPassengerCountsByVehicle;
async function findPassengerCountsByAssociation(associationId, fromDate, toDate) {
    let result = [];
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db
            .collection(collection)
            .find({
            associationId: associationId,
            created: { $gte: fromDate, $lt: toDate },
        })
            .toArray();
        console.log(`${mm} 🍎🍎🍎 findPassengerCountsByAssociation found: 
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
exports.findPassengerCountsByAssociation = findPassengerCountsByAssociation;
async function findPassengerCountsByAmbassador(userId, fromDate, toDate) {
    let result = [];
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db
            .collection(collection)
            .find({ userId: userId, created: { $gte: fromDate, $lt: toDate } })
            .toArray();
        console.log(`${mm} 🍎🍎🍎 findPassengerCountsByAmbassador found: 
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
exports.findPassengerCountsByAmbassador = findPassengerCountsByAmbassador;
//# sourceMappingURL=ambassador.api.js.map