"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const constants_1 = require("./constants");
const mongodb_1 = require("mongodb");
const baySteps = `${constants_1.head}${constants_1.dbUser}:${constants_1.door}@${constants_1.cluster}/${constants_1.db}?${constants_1.tail}&${constants_1.app}`;
console.log(`🔼 🔼 🔼 Configure MongoClient, uri: ${baySteps} 🍎🍎🍎`);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
exports.client = new mongodb_1.MongoClient(baySteps, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
//
//# sourceMappingURL=config.js.map