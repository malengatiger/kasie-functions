"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findVehicleDepartures = exports.findVehicleArrivals = exports.findVehicleHeartbeats = exports.findVehicleVideos = exports.findVehiclePhotos = exports.findVehicleById = exports.createVehicleVideo = exports.createVehiclePhoto = exports.createVehicleDeparture = exports.createVehicleArrival = exports.createHeartbeat = exports.createCar = exports.updateVehicleQRCodeX = void 0;
const config_1 = require("../database/config");
const upload_to_bucket_1 = require("../utilities/upload_to_bucket");
const error_api_1 = require("./error.api");
const mm = "🍎🍎🍎 vehicle.api";
const dbName = "kasie_transie";
const heartbeatCollection = "VehicleHeartbeat";
const photoCollection = "VehiclePhoto";
const vehicleCollection = "Vehicle";
const videoCollection = "VehicleVideo";
const arrivalCollection = "VehicleArrival";
const departureCollection = "VehicleDeparture";
async function updateVehicleQRCodeX(vehicleId, qrCodeUrl) {
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
        console.error(e);
        (0, error_api_1.handleError)(`updateVehicleQRCodeX: ${e}`, {
            vehicleId: vehicleId,
        });
        throw new Error(`updateVehicleQRCodeX: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
}
exports.updateVehicleQRCodeX = updateVehicleQRCodeX;
async function createCar(car) {
    let result;
    let mCar = {};
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection("Vehicle").insertOne(car);
        console.log(`${mm} 🍎🍎🍎 createCar done: 🥬 ${JSON.stringify(result)} 🥬}  ... get car qrCode ... 🥬🥬 `);
        const m = await (0, upload_to_bucket_1.makeVehicleQRCode)(car);
        await updateVehicleQRCodeX(car.vehicleId, m.qrCodeUrl);
        mCar = {
            vehicleId: car.vehicleId,
            vehicleReg: car.vehicleReg,
            associationId: car.associationId,
            associationName: car.associationName,
            qrCodeUrl: m.qrCodeUrl,
            active: 0,
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            countryId: car.countryId,
            dateInstalled: "",
            _id: result.insertedId,
            _partitionKey: car.associationId,
            make: car.make,
            model: car.model,
            year: car.year,
            passengerCapacity: car.passengerCapacity,
            ownerId: car.ownerId,
            ownerName: car.ownerName,
        };
        return mCar;
    }
    catch (e) {
        console.error(e);
        (0, error_api_1.handleError)(`createCar: ${e}`, {
            vehicleId: car.vehicleId,
        });
        throw new Error(`createCar: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
    return mCar;
}
exports.createCar = createCar;
async function createHeartbeat(heartbeat) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection(heartbeatCollection).insertOne(heartbeat);
        console.log(`${mm} 🍎🍎🍎 createHeartbeat done: 🥬 ${JSON.stringify(result)} 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
        (0, error_api_1.handleError)(`createHeartbeat: ${e}`, {
            vehicleId: heartbeat.vehicleId,
        });
        throw new Error(`createHeartbeat: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
}
exports.createHeartbeat = createHeartbeat;
async function createVehicleArrival(arrival) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection(arrivalCollection).insertOne(arrival);
        console.log(`${mm} 🍎🍎🍎 createVehicleArrival done: 🥬 ${JSON.stringify(result)} 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
        (0, error_api_1.handleError)(`createVehicleArrival: ${e}`, {
            vehicleId: arrival.vehicleId,
        });
        throw new Error(`createVehicleArrival: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
}
exports.createVehicleArrival = createVehicleArrival;
async function createVehicleDeparture(departure) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection(departureCollection).insertOne(departure);
        console.log(`${mm} 🍎🍎🍎 createVehicleDeparture done: 🥬 ${JSON.stringify(result)} 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
        (0, error_api_1.handleError)(`createVehicleDeparture: ${e}`, {
            vehicleId: departure.vehicleId,
        });
        throw new Error(`createVehicleDeparture: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
}
exports.createVehicleDeparture = createVehicleDeparture;
async function createVehiclePhoto(photo) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection(photoCollection).insertOne(photo);
        console.log(`${mm} 🍎🍎🍎 createVehiclePhoto done: 🥬 ${JSON.stringify(result)} 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
        (0, error_api_1.handleError)(`createVehiclePhoto: ${e}`, {
            vehicleId: photo.vehicleId,
        });
        throw new Error(`createVehiclePhoto: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
}
exports.createVehiclePhoto = createVehiclePhoto;
async function createVehicleVideo(video) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection(videoCollection).insertOne(video);
        console.log(`${mm} 🍎🍎🍎 createVehicleVideo done: 🥬 ${JSON.stringify(result)} 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
        (0, error_api_1.handleError)(`createVehicleVideo: ${e}`, {
            vehicleId: video.vehicleId,
        });
        throw new Error(`createVehicleVideo: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
    return undefined;
}
exports.createVehicleVideo = createVehicleVideo;
async function findVehicleById(vehicleId) {
    let result = [];
    const vehicle = {};
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        const car = await db
            .collection(vehicleCollection)
            .findOne({ vehicleId: vehicleId });
        console.log(`${mm} 🍎🍎🍎 findVehicleById found: 
      🥬 ${result.length} records 🥬 🥬 `);
        if (car !== null) {
            vehicle.vehicleId = car.vehicleId;
            vehicle.vehicleReg = car.vehicleReg;
            vehicle.associationId = car.associationId;
            vehicle.associationName = car.associationName;
            vehicle.qrCodeUrl = car.qrCodeUrl;
            vehicle.active = car.active;
            vehicle.created = car.created;
            vehicle.updated = car.updated;
            vehicle.countryId = car.countryId;
            vehicle.dateInstalled = car.dateInstalled;
        }
        return vehicle;
    }
    catch (e) {
        console.error(e);
        (0, error_api_1.handleError)(`findVehicleById: ${e}`, {
            vehicleId: vehicleId,
        });
        throw new Error(`findVehicleById: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
    return vehicle;
}
exports.findVehicleById = findVehicleById;
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
        (0, error_api_1.handleError)(`findVehiclePhotos: ${e}`, {
            vehicleId: vehicleId,
        });
        throw new Error(`findVehiclePhotos: ${e}`);
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
        (0, error_api_1.handleError)(`findVehicleVideos: ${e}`, {
            vehicleId: vehicleId,
        });
        throw new Error(`findVehicleVideos: ${e}`);
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
        (0, error_api_1.handleError)(`findVehicleHeartbeats: ${e}`, {
            vehicleId: vehicleId,
        });
        throw new Error(`findVehicleHeartbeats: ${e}`);
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
        (0, error_api_1.handleError)(`findVehicleArrivals: ${e}`, {
            vehicleId: vehicleId,
        });
        throw new Error(`findVehicleArrivals: ${e}`);
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
        (0, error_api_1.handleError)(`findVehicleDepartures: ${e}`, {
            vehicleId: vehicleId,
        });
        throw new Error(`findVehicleDepartures: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
    return result;
}
exports.findVehicleDepartures = findVehicleDepartures;
//# sourceMappingURL=vehicle.api.js.map