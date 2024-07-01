"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllAppErrors = exports.findAssociationAppErrors = exports.createAppError = exports.handleError = void 0;
const config_1 = require("../database/config");
const mm = "dispatch.api";
const dbName = "kasie_transie";
const appErrorCollection = "AppError";
function handleError(errorMessage, options) {
    const err = {};
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
exports.handleError = handleError;
async function createAppError(rec) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection(appErrorCollection).insertOne(rec);
        console.log(`${mm} 🍎🍎🍎 createAppError done: 🥬 ${JSON.stringify(result)} 🥬 🥬 `);
        //todo - send error to FCM
        return result;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await config_1.client.close();
    }
    return undefined;
}
exports.createAppError = createAppError;
//
async function findAssociationAppErrors(associationId, fromDate, toDate) {
    let result = [];
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db
            .collection(appErrorCollection)
            .find({
            associationId: associationId,
            created: { $gte: fromDate, $lt: toDate },
        })
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
exports.findAssociationAppErrors = findAssociationAppErrors;
async function findAllAppErrors(fromDate, toDate) {
    let result = [];
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db
            .collection(appErrorCollection)
            .find({
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
exports.findAllAppErrors = findAllAppErrors;
//# sourceMappingURL=error.api.js.map