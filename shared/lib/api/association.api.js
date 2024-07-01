"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssociationUsers = exports.getAssociationCars = exports.createAssociationUser = exports.createAssociation = exports.createSettings = exports.getAssociations = exports.getCountries = void 0;
const mongodb_1 = require("mongodb");
const config_1 = require("../database/config");
const admin = require("firebase-admin");
const error_api_1 = require("./error.api");
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
        (0, error_api_1.handleError)(`getCountries: ${e}`, {});
        throw new Error(`getCountries: ${e}`);
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
        (0, error_api_1.handleError)(`getAssociations: ${e}`, {});
        throw new Error(`getAssociations: ${e}`);
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
        (0, error_api_1.handleError)(`createSettings: ${e}`, {});
        throw new Error(`createSettings: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
}
exports.createSettings = createSettings;
async function createAssociation(association) {
    console.log(`\n\n${mm} 🍎🍎🍎 createAssociation ............`);
    let result;
    let bag = {};
    try {
        const user = {
            _partitionKey: association.associationId,
            _id: new mongodb_1.ObjectId(),
            userType: "ADMIN",
            userId: "",
            firstName: association.adminUserFirstName,
            lastName: association.adminUserLastName,
            gender: "",
            countryId: "",
            associationId: association.associationId,
            associationName: "",
            fcmToken: "",
            email: association.adminEmail,
            cellphone: "",
            password: association.adminPassword,
            countryName: "",
            dateRegistered: new Date().toISOString(),
            qrCodeUrl: "",
            profileUrl: "",
            profileThumbnail: "",
        };
        await createAssociationUser(user);
        association.adminPassword = "";
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        result = await db.collection("Association").insertOne(association);
        console.log(`${mm} 🍎🍎🍎 createAssociation done: 🥬 ${result.insertedId}  🥬🥬 `);
        bag.association = association;
        bag.user = user;
        return bag;
    }
    catch (e) {
        console.error(e);
        (0, error_api_1.handleError)(`createAssociation: ${e}`, {});
        throw new Error(`createAssociation: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
    return bag;
}
exports.createAssociation = createAssociation;
async function createAssociationUser(user) {
    console.log(`\n\n${mm} 🍎🍎🍎 createAssociationUser ............`);
    const mUser = {};
    try {
        const me = await admin.auth().createUser({
            email: user.email,
            password: user.password,
            displayName: `${user.firstName} ${user.lastName}`,
        });
        console.log(`${mm} Created Firebase user: 🍎 ${JSON.stringify(me)}`);
        mUser.associationId = user.associationId;
        mUser.firstName = user.firstName;
        mUser.lastName = user.lastName;
        mUser.email = user.email;
        mUser.userId = me.uid;
        mUser.userType = user.userType;
        console.log(`${mm} write user to database`);
        await config_1.client.connect();
        const db = config_1.client.db(dbName);
        const result = await db.collection("User").insertOne(mUser);
        console.log(`${mm} 🍎🍎🍎 createAssociationUser done: 🥬 ${result.insertedId}  🥬🥬 `);
    }
    catch (e) {
        console.error(e);
        (0, error_api_1.handleError)(`createAssociationUser: ${e}`, {});
        throw new Error(`createAssociationUser: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
    return mUser;
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
        (0, error_api_1.handleError)(`getAssociationCars: ${e}`, {});
        throw new Error(`getAssociationCars: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
    return result;
}
exports.getAssociationCars = getAssociationCars;
async function getAssociationUsers(associationId) {
    let result = [];
    try {
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
        (0, error_api_1.handleError)(`getAssociationUsers: ${e}`, {});
        throw new Error(`getAssociationUsers: ${e}`);
    }
    finally {
        await config_1.client.close();
    }
    return result;
}
exports.getAssociationUsers = getAssociationUsers;
//# sourceMappingURL=association.api.js.map