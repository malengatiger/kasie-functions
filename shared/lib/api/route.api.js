"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouteLandmarks = exports.getRoutePoints = exports.createRouteLandmarks = exports.createRoutePoints = exports.createRoute = exports.listLandmarksByLocation = exports.getRoutesByLocation = exports.getAssociationRoutes = exports.getRoutes = exports.updateRoute = void 0;
const config_1 = require("../database/config");
const upload_to_bucket_1 = require("../utilities/upload_to_bucket");
// import { head, dbUser, door, cluster, db, tail, app } from "../database/constants";
// const baySteps = `${head}${dbUser}:${door}@${cluster}/${db}?${tail}&${app}`;
const mm = 'route.api';
const dbName = 'kasie_transie';
async function updateRoute(routeId, qrCodeUrl) {
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
exports.updateRoute = updateRoute;
async function getRoutes() {
    let result = [];
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection('Route').find().toArray();
        console.log(`${mm} 🍎🍎🍎 Found 🥬 ${result.length} routes 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.log(e);
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
        result = await db.collection("Route").find({ associationId: associationId }).toArray();
        console.log(`${mm} 🍎🍎🍎 Found 🥬 ${result.length} association routes 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.log(e);
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
        result = await db
            .collection("Route")
            .find({ associationId: associationId })
            .toArray();
        console.log(`${mm} 🍎🍎🍎 Found 🥬 ${result.length} association routes 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.log(e);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await config_1.client.close();
    }
    return result;
}
exports.getRoutesByLocation = getRoutesByLocation;
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
    }
    finally {
        // Ensures that the client will close when you finish/error
        await config_1.client.close();
    }
    return result;
}
exports.listLandmarksByLocation = listLandmarksByLocation;
async function createRoute(route) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection("Route").insertOne(route);
        const url = await (0, upload_to_bucket_1.makeRouteQRCode)(route.routeId, route.name);
        await updateRoute(route.routeId, url);
        console.log(`${mm} 🍎🍎🍎 createARoute done: 🥬 ${JSON.stringify(result)}  🥬🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await config_1.client.close();
    }
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
    }
    finally {
        await config_1.client.close();
    }
}
exports.createRouteLandmarks = createRouteLandmarks;
async function getRoutePoints(routeId) {
    let result = [];
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        console.log(`${mm} 🍎🍎🍎 Connected to MongoDB Atlas database: 🍎🍎🍎 ${db.databaseName}`);
        result = await db.collection('RoutePoint').find({ routeId: routeId }).toArray();
        console.log(`${mm} 🍎🍎🍎 getRoutePoints found: 🥬 ${result.length} points 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await config_1.client.close();
    }
    return result;
}
exports.getRoutePoints = getRoutePoints;
async function getRouteLandmarks(routeId) {
    let result = [];
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        console.log(`${mm} 🍎🍎🍎 Connected to MongoDB Atlas database: 🍎🍎🍎 ${db.databaseName}`);
        result = await db
            .collection("RouteLandmark")
            .find({ routeId: routeId })
            .toArray();
        console.log(`${mm} 🍎🍎🍎 getRouteLandmarks found: 🥬 ${result.length} points 🥬 🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await config_1.client.close();
    }
    return result;
}
exports.getRouteLandmarks = getRouteLandmarks;
//# sourceMappingURL=route.api.js.map