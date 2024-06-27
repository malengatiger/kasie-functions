import { head, dbUser, door, cluster, db, tail, app } from "./constants";
import {  MongoClient, ServerApiVersion } from 'mongodb';

const baySteps = `${head}${dbUser}:${door}@${cluster}/${db}?${tail}&${app}`;

console.log(`🔼 🔼 🔼 Configure MongoClient, uri: ${baySteps} 🍎🍎🍎`);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client: MongoClient = new MongoClient(baySteps, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
//
