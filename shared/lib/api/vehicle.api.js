"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findVehicleDepartures = exports.findVehicleArrivals = exports.findVehicleHeartbeats = exports.findVehicleVideos = exports.findVehiclePhotos = exports.createVehicleVideo = exports.createVehiclePhoto = exports.createVehicleDeparture = exports.createVehicleArrival = exports.createHeartbeat = exports.createCar = exports.updateCar = void 0;
const config_1 = require("../database/config");
const upload_to_bucket_1 = require("../utilities/upload_to_bucket");
const mm = "🍎🍎🍎 vehicle.api";
const dbName = "kasie_transie";
const heartbeatCollection = "VehicleHeartbeat";
const photoCollection = "VehiclePhoto";
const videoCollection = "VehicleVideo";
const arrivalCollection = "VehicleArrival";
const departureCollection = "VehicleDeparture";
async function updateCar(vehicleId, qrCodeUrl) {
    try {
        console.log(`${mm} updateCar: ${vehicleId} 🎲 qrCodeUrl: ${qrCodeUrl}`);
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        const filter = { vehicleId: vehicleId };
        const options = { upsert: false };
        const updateDoc = {
            $set: {
                qrCodeUrl: qrCodeUrl,
            },
        };
        // Update the first document that matches the filter
        const cars = db.collection("Vehicle");
        const result = await cars.updateOne(filter, updateDoc, options);
        console.log(`${mm} ${result.matchedCount} car(s) matched the filter, updated ${result.modifiedCount} document(s)`);
        return result;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await config_1.client.close();
    }
}
exports.updateCar = updateCar;
async function createCar(car) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection("Vehicle").insertOne(car);
        console.log(`${mm} 🍎🍎🍎 createCar done: 🥬 ${JSON.stringify(result)} 🥬}  ... get car qrCode ... 🥬🥬 `);
        const qrCodeUrl = await (0, upload_to_bucket_1.makeVehicleQRCode)(car.vehicleId, car.vehicleReg, car.associationId, car.associationName);
        await updateCar(car.vehicleId, qrCodeUrl);
        return result;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await config_1.client.close();
    }
}
exports.createCar = createCar;
async function createHeartbeat(rec) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection(heartbeatCollection).insertOne(rec);
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
exports.createHeartbeat = createHeartbeat;
async function createVehicleArrival(rec) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection(arrivalCollection).insertOne(rec);
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
exports.createVehicleArrival = createVehicleArrival;
async function createVehicleDeparture(rec) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection(departureCollection).insertOne(rec);
        console.log(`${mm} 🍎🍎🍎 createVehicleDeparture done: 🥬 ${JSON.stringify(result)} 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await config_1.client.close();
    }
}
exports.createVehicleDeparture = createVehicleDeparture;
async function createVehiclePhoto(rec) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection(photoCollection).insertOne(rec);
        console.log(`${mm} 🍎🍎🍎 createVehiclePhoto done: 🥬 ${JSON.stringify(result)} 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await config_1.client.close();
    }
}
exports.createVehiclePhoto = createVehiclePhoto;
async function createVehicleVideo(rec) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection(videoCollection).insertOne(rec);
        console.log(`${mm} 🍎🍎🍎 createVehicleVideo done: 🥬 ${JSON.stringify(result)} 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await config_1.client.close();
    }
}
exports.createVehicleVideo = createVehicleVideo;
//
async function findVehiclePhotos(vehicleId) {
    let result = [];
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db
            .collection(photoCollection)
            .find({ vehicleId: vehicleId })
            .toArray();
        console.log(`${mm} 🍎🍎🍎 findVehiclePhotos found: 
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
exports.findVehiclePhotos = findVehiclePhotos;
async function findVehicleVideos(vehicleId) {
    let result = [];
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db
            .collection(videoCollection)
            .find({ vehicleId: vehicleId })
            .toArray();
        console.log(`${mm} 🍎🍎🍎 findVehicleVideos found: 
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
exports.findVehicleVideos = findVehicleVideos;
async function findVehicleHeartbeats(vehicleId, fromDate, toDate) {
    let result = [];
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db
            .collection(heartbeatCollection)
            .find({ vehicleId: vehicleId, created: { $gte: fromDate, $lt: toDate } })
            .toArray();
        console.log(`${mm} 🍎🍎🍎 findVehicleHeartbeats found: 
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
exports.findVehicleHeartbeats = findVehicleHeartbeats;
async function findVehicleArrivals(vehicleId, fromDate, toDate) {
    let result = [];
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db
            .collection(arrivalCollection)
            .find({ vehicleId: vehicleId, created: { $gte: fromDate, $lt: toDate } })
            .toArray();
        console.log(`${mm} 🍎🍎🍎 findVehicleArrivals found: 
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
exports.findVehicleArrivals = findVehicleArrivals;
async function findVehicleDepartures(vehicleId, fromDate, toDate) {
    let result = [];
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db
            .collection(departureCollection)
            .find({ vehicleId: vehicleId, created: { $gte: fromDate, $lt: toDate } })
            .toArray();
        console.log(`${mm} 🍎🍎🍎 findVehicleDepartures found: 
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
exports.findVehicleDepartures = findVehicleDepartures;
//# sourceMappingURL=vehicle.api.js.map