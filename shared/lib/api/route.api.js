"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouteLandmarks = exports.getRoutePoints = exports.createRouteLandmarks = exports.createRoutePoints = exports.createRoute = exports.listLandmarksByLocation = exports.getRoutesByLocation = exports.getAssociationRoutes = exports.getRoutes = exports.updateRouteQRCode = void 0;
const mongodb_1 = require("mongodb");
const config_1 = require("../database/config");
const upload_to_bucket_1 = require("../utilities/upload_to_bucket");
const error_api_1 = require("./error.api");
const mm = "route.api";
const dbName = "kasie_transie";
async function updateRouteQRCode(routeId, qrCodeUrl) {
    try {
        console.log(`${mm} updateRoute: ${routeId} 🎲 qrCodeUrl: ${qrCodeUrl}`);
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        const filter = { routeId: routeId };
        const options = { upsert: false };
        const updateDoc = {
            $set: {
                qrCodeUrl: qrCodeUrl,
            },
        };
        // Update the first document that matches the filter
        const routes = db.collection("Route");
        const result = await routes.updateOne(filter, updateDoc, options);
        console.log(`${mm} ${result.matchedCount} car(s) matched the filter, 
      updated ${result.modifiedCount} document(s)`);
        return result;
    }
    catch (e) {
        console.error(e);
        (0, error_api_1.handleError)(`updateRoute: ${routeId} 🎲 qrCodeUrl: ${qrCodeUrl}`, {
            routeId: routeId,
        });
        throw new Error(`updateRoute: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
}
exports.updateRouteQRCode = updateRouteQRCode;
async function getRoutes() {
    let result = [];
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        const list = await db.collection("Route").find().toArray();
        console.log(`${mm} 🍎🍎🍎 Found 🥬 ${list.length} routes 🥬 🥬 `);
        build(list, result);
        return result;
    }
    catch (e) {
        console.log(e);
        (0, error_api_1.handleError)(`getRoutes: ${e}`, {});
        throw new Error(`getRoutes: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
    return result;
}
exports.getRoutes = getRoutes;
async function getAssociationRoutes(associationId) {
    let result = [];
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        const list = await db
            .collection("Route")
            .find({ associationId: associationId })
            .toArray();
        console.log(`${mm} 🍎🍎🍎 Found 🥬 ${list.length} association routes 🥬 🥬 `);
        build(list, result);
        return result;
    }
    catch (e) {
        console.log(e);
        (0, error_api_1.handleError)(`getAssociationRoutes: ${e}`, {});
        throw new Error(`getAssociationRoutes: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
    return result;
}
exports.getAssociationRoutes = getAssociationRoutes;
async function getRoutesByLocation(latitude, longitude, radius, associationId) {
    let result = [];
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        const list = await db
            .collection("Route")
            .find({ associationId: associationId })
            .toArray();
        console.log(`${mm} 🍎🍎🍎 Found 🥬 ${result.length} association routes 🥬 🥬 `);
        build(list, result);
        return result;
    }
    catch (e) {
        console.log(e);
        (0, error_api_1.handleError)(`getRoutesByLocation: ${e}`, {});
        throw new Error(`getRoutesByLocation: ${e}`);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await config_1.client.close();
    }
    return result;
}
exports.getRoutesByLocation = getRoutesByLocation;
function build(list, routes) {
    list.forEach((route) => {
        const r = {};
        r.routeId = route.routeId;
        r.associationId = route.associationId;
        r.associationName = route.associationName;
        r.name = route.name;
        r.active = route.active;
        r.qrCodeUrl = route.qrCodeUrl;
        r.routeNumber = route.routeNumber;
        r.countryName = route.countryName;
        r.countryId = route.countryId;
        routes.push(r);
    });
}
async function listLandmarksByLocation(latitude, longitude, radius, associationId) {
    let result = [];
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db
            .collection("Landmark")
            .find({ associationId: associationId })
            .toArray();
        console.log(`${mm} 🍎🍎🍎 Found 🥬 ${result.length} association routes 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.log(e);
        (0, error_api_1.handleError)(`listLandmarksByLocation: ${e}`, {
            associationId: associationId
        });
        throw new Error(`listLandmarksByLocation: ${e}`);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await config_1.client.close();
    }
    return result;
}
exports.listLandmarksByLocation = listLandmarksByLocation;
async function createRoute(route) {
    const resp = {};
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        await db.collection("Route").insertOne(route);
        route = await (0, upload_to_bucket_1.makeRouteQRCode)(route);
        console.log(`${mm} 🍎🍎🍎 createRoute done: 🥬 ${JSON.stringify(route)}  🥬🥬 `);
        resp.routeId = route.routeId;
        resp.associationId = route.associationId;
        resp.associationName = route.associationName;
        resp.name = route.name;
        resp.active = 0;
        resp.qrCodeUrl = route.qrCodeUrl;
        resp.routeNumber = route.routeNumber;
        resp.countryName = route.countryName;
        resp.countryId = route.countryId;
        return resp;
    }
    catch (e) {
        console.error(e);
        (0, error_api_1.handleError)(`createRoute: ${e}`, {});
        throw new Error(`createRoute: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
    return resp;
}
exports.createRoute = createRoute;
async function createRoutePoints(routePoints) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection("RoutePoint").insertMany(routePoints);
        console.log(`${mm} 🍎🍎🍎 createRoutePoints done: 🥬 ${JSON.stringify(result)}  🥬🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
        (0, error_api_1.handleError)(`createRoutePoints: ${e}`, {
            routeId: routePoints[0].routeId,
        });
        throw new Error(`createRoutePoints: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
}
exports.createRoutePoints = createRoutePoints;
async function createRouteLandmarks(routeLandmarks) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection("RouteLandmark").insertMany(routeLandmarks);
        console.log(`${mm} 🍎🍎🍎 createRouteLandmarks done: 🥬 ${JSON.stringify(result)}  🥬🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
        (0, error_api_1.handleError)(`createRouteLandmarks: ${e}`, {
            routeId: routeLandmarks[0].routeId,
        });
        throw new Error(`createRouteLandmarks: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
}
exports.createRouteLandmarks = createRouteLandmarks;
async function getRoutePoints(routeId) {
    let routePoints = [];
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        console.log(`${mm} 🍎🍎🍎 Connected to MongoDB Atlas database: 🍎🍎🍎 ${db.databaseName}`);
        const list = await db
            .collection("RoutePoint")
            .find({ routeId: routeId })
            .toArray();
        list.forEach((point) => {
            routePoints.push({
                routePointId: point.routePointId,
                routeId: point.routeId,
                associationId: point.associationId,
                created: point.created,
                heading: point.heading,
                index: point.index,
                position: point.position,
                _partitionKey: "",
                _id: new mongodb_1.ObjectId(),
            });
        });
        console.log(`${mm} 🍎🍎🍎 getRoutePoints found: 🥬 ${routePoints.length} points 🥬 🥬 `);
        return routePoints;
    }
    catch (e) {
        console.error(e);
        (0, error_api_1.handleError)(`getRoutePoints: ${e}`, {
            routeId: routeId,
        });
        throw new Error(`getRoutePoints: ${e}`);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await config_1.client.close();
    }
    return routePoints;
}
exports.getRoutePoints = getRoutePoints;
async function getRouteLandmarks(routeId) {
    let result = [];
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        console.log(`${mm} 🍎🍎🍎 Connected to MongoDB Atlas database: 🍎🍎🍎 ${db.databaseName}`);
        const list = await db
            .collection("RouteLandmark")
            .find({ routeId: routeId })
            .toArray();
        list.forEach((point) => {
            result.push({
                _partitionKey: "",
                _id: point._id,
                routeId: point.routeId,
                routePointId: point.routePointId,
                associationId: point.associationId,
                index: point.index,
                routePointIndex: point.routePointIndex,
                routeName: point.routeName,
                landmarkId: point.landmarkId,
                landmarkName: point.land,
                created: point.created,
                position: point.position,
            });
        });
        console.log(`${mm} 🍎🍎🍎 getRouteLandmarks found: 🥬 ${result.length} points 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
        (0, error_api_1.handleError)(`getRouteLandmarks: ${e}`, {
            routeId: routeId,
        });
        throw new Error(`getRouteLandmarks: ${e}`);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await config_1.client.close();
    }
    return result;
}
exports.getRouteLandmarks = getRouteLandmarks;
//# sourceMappingURL=route.api.js.map