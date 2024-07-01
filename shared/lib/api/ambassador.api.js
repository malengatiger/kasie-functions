"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPassengerCountsByAmbassador = exports.findPassengerCountsByAssociation = exports.findPassengerCountsByVehicle = exports.createPassengerCount = void 0;
const config_1 = require("../database/config");
const error_api_1 = require("./error.api");
const mm = "ambassador.api";
const dbName = "kasie_transie";
const collection = "AmbassadorPassengerCount";
async function createPassengerCount(passengerCount) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection(collection).insertOne(passengerCount);
        console.log(`${mm} 🍎🍎🍎 createPassengerCount done: 🥬 ${JSON.stringify(result)} 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
        (0, error_api_1.handleError)(`createPassengerCount: ${e}`, {
            associationId: passengerCount.associationId,
            vehicleId: passengerCount.vehicleId,
            vehicleReg: passengerCount.vehicleReg,
            routeId: passengerCount.routeId,
        });
        throw new Error(`createPassengerCount: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
}
exports.createPassengerCount = createPassengerCount;
//
async function findPassengerCountsByVehicle(vehicleId, fromDate, toDate) {
    let passengerCounts = [];
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        const list = await db
            .collection(collection)
            .find({ vehicleId: vehicleId, created: { $gte: fromDate, $lt: toDate } })
            .toArray();
        build(list, passengerCounts);
        console.log(`${mm} 🍎🍎🍎 findPassengerCountsByVehicleId found: 
      🥬 ${passengerCounts.length} records 🥬 🥬 `);
        return passengerCounts;
    }
    catch (e) {
        console.error(e);
        (0, error_api_1.handleError)(`findPassengerCountsByVehicle: ${e}`, {
            vehicleId: vehicleId,
        });
        throw new Error(`findPassengerCountsByVehicle: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
    return passengerCounts;
}
exports.findPassengerCountsByVehicle = findPassengerCountsByVehicle;
function build(list, passengerCounts) {
    list.forEach((item) => {
        const m = {};
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
async function findPassengerCountsByAssociation(associationId, fromDate, toDate) {
    let passengerCounts = [];
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        const list = await db
            .collection(collection)
            .find({
            associationId: associationId,
            created: { $gte: fromDate, $lt: toDate },
        })
            .toArray();
        build(list, passengerCounts);
        console.log(`${mm} 🍎🍎🍎 findPassengerCountsByAssociation found: 
      🥬 ${list.length} records 🥬 🥬 `);
        return passengerCounts;
    }
    catch (e) {
        console.error(e);
        (0, error_api_1.handleError)(`findPassengerCountsByAssociation: ${e}`, {
            associationId: associationId,
        });
        throw new Error(`findPassengerCountsByAssociation: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
    return passengerCounts;
}
exports.findPassengerCountsByAssociation = findPassengerCountsByAssociation;
async function findPassengerCountsByAmbassador(userId, fromDate, toDate) {
    let passengerCounts = [];
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        const list = await db
            .collection(collection)
            .find({ userId: userId, created: { $gte: fromDate, $lt: toDate } })
            .toArray();
        build(list, passengerCounts);
        console.log(`${mm} 🍎🍎🍎 findPassengerCountsByAmbassador found: 
      🥬 ${list.length} records 🥬 🥬 `);
        return passengerCounts;
    }
    catch (e) {
        console.error(e);
        (0, error_api_1.handleError)(`findPassengerCountsByAssociation: ${e}`, {});
        throw new Error(`findPassengerCountsByAssociation: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
    return passengerCounts;
}
exports.findPassengerCountsByAmbassador = findPassengerCountsByAmbassador;
//# sourceMappingURL=ambassador.api.js.map