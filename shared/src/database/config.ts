import { head, dbUser, door, cluster, db, tail, app } from "./constants";
import {  MongoClient, ServerApiVersion } from 'mongodb';

const baySteps = `${head}${dbUser}:${door}@${cluster}/${db}?${tail}&${app}`;

// const n = 'aubreym';
// const p = 'kkTiger23';
// const uri = `mongodb+srv://${n}:${p}@cluster0.njz1rn4.mongodb.net/kasie_transie?retryWrites=true&w=majority&appName=Cluster0`;
console.log(`🔼 🔼 🔼 baySteps: ${baySteps} 🍎🍎🍎`);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client: MongoClient = new MongoClient(baySteps, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
//
