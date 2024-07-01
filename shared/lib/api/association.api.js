"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssociationUsers = exports.getAssociationCars = exports.createAssociationUser = exports.createAssociation = exports.createSettings = exports.getAssociations = exports.getCountries = void 0;
const config_1 = require("../database/config");
// import { head, dbUser, door, cluster, db, tail, app } from "../database/constants";
// const baySteps = `${head}${dbUser}:${door}@${cluster}/${db}?${tail}&${app}`;
const mm = "association.api";
const dbName = "kasie_transie";
async function getCountries() {
    let result = [];
    try {
        await config_1.client.connect();
        // await client.db('admin').command({ ping: 1 });
        const db = config_1.client.db(dbName);
        result = await db.collection("Country").find().toArray();
        console.log(`${mm} 🍎🍎🍎 Found 🥬 ${result.length} countries 🥬 🥬 `);
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
exports.getCountries = getCountries;
async function getAssociations() {
    let result = [];
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection("Association").find().toArray();
        console.log(`${mm} 🍎🍎🍎 getAssociations found: 🥬 ${result.length} associations 🥬 🥬 `);
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
exports.getAssociations = getAssociations;
async function createSettings(settings) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection("SettingsModel").insertOne(settings);
        console.log(`${mm} 🍎🍎🍎 createSettings done: 🥬 ${result.insertedId}  🥬🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await config_1.client.close();
    }
}
exports.createSettings = createSettings;
async function createAssociation(association) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection("Association").insertOne(association);
        console.log(`${mm} 🍎🍎🍎 createAssociation done: 🥬 ${result.insertedId}  🥬🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await config_1.client.close();
    }
}
exports.createAssociation = createAssociation;
async function createAssociationUser(association) {
    let result;
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection("User").insertOne(association);
        console.log(`${mm} 🍎🍎🍎 createAssociationUser done: 🥬 ${result.insertedId}  🥬🥬 `);
        return result;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await config_1.client.close();
    }
}
exports.createAssociationUser = createAssociationUser;
async function getAssociationCars(associationId) {
    let result = [];
    try {
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db
            .collection("Vehicle")
            .find({ associationId: associationId })
            .toArray();
        console.log(`${mm} 🍎🍎🍎 getAssociationCars found: 🥬 ${result.length} cars 🥬 🥬 `);
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
exports.getAssociationCars = getAssociationCars;
async function getAssociationUsers(associationId) {
    let result = [];
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db
            .collection("User")
            .find({ associationId: associationId })
            .toArray();
        console.log(`${mm} 🍎🍎🍎 getAssociationUsers found: 🥬 ${result.length} users 🥬 🥬 `);
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
exports.getAssociationUsers = getAssociationUsers;
//# sourceMappingURL=association.api.js.map