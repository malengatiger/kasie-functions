"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommuterResponse = exports.createCommuterRequest = exports.createCommuter = exports.updateCommuter = void 0;
const config_1 = require("../database/config");
const upload_to_bucket_1 = require("../utilities/upload_to_bucket");
const mm = "🍎🍎🍎 vehicle.api";
const dbName = "kasie_transie";
const commuterRequestCollection = "CommuterRequest";
const commuterResponseCollection = "CommuterResponse";
const commuterCollection = "Commuter";
async function updateCommuter(commuterId, qrCodeUrl) {
    try {
        console.log(`${mm} updateCommuter: ${commuterId} 🎲 qrCodeUrl: ${qrCodeUrl}`);
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
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
        console.log(`${mm} ${result.matchedCount} Commuter(s) matched the filter, updated ${result.modifiedCount} document(s)`);
        return result;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await config_1.client.close();
    }
}
exports.updateCommuter = updateCommuter;
async function createCommuter(commuter) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection(commuterCollection).insertOne(commuter);
        console.log(`${mm} 🍎🍎🍎 createCommuter done: 🥬 ${JSON.stringify(result)} 🥬}  ... get commuter qrCode ... 🥬🥬 `);
        const qrCodeUrl = await (0, upload_to_bucket_1.makeUserQRCode)(commuter.commuterId, commuter.email);
        await updateCommuter(commuter.commuterId, qrCodeUrl);
        return result;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await config_1.client.close();
    }
}
exports.createCommuter = createCommuter;
async function createCommuterRequest(rec) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection(commuterRequestCollection).insertOne(rec);
        console.log(`${mm} 🍎🍎🍎 createHeartbeat done: 🥬 ${JSON.stringify(result)} 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await config_1.client.close();
    }
}
exports.createCommuterRequest = createCommuterRequest;
async function createCommuterResponse(rec) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection(commuterResponseCollection).insertOne(rec);
        console.log(`${mm} 🍎🍎🍎 createVehicleArrival done: 🥬 ${JSON.stringify(result)} 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await config_1.client.close();
    }
}
exports.createCommuterResponse = createCommuterResponse;
//# sourceMappingURL=commuter.api.js.map