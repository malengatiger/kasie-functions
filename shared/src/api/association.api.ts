import { Db } from "mongodb";
import { client } from "../database/config";
import { head, dbUser, door, cluster, db, tail, app } from "../database/constants";
const baySteps = `${head}${dbUser}:${door}@${cluster}/${db}?${tail}&${app}`;
const mm = 'association.api';
export async function getCountries() {
    let result: any[];
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      console.log(`${mm} 🍎🍎🍎 Connected to MongoDB Atlas! 🍎🍎🍎 ${baySteps}`);
      // Send a ping to confirm a successful connection
      // await client.db('admin').command({ ping: 1 });
      console.log('${mm} 🍎🍎🍎 Attempting to find countries ..... 🍎🍎🍎');
      const db: Db = client.db('kasie_transie');
      console.log(
        `🍎🍎🍎 Connected to MongoDB Atlas database: 🍎🍎🍎 ${db.databaseName}`,
      );

      result = await db.collection('Country').find().toArray();
      console.log(`${mm} 🍎🍎🍎 Found 🥬 ${result.length} documents 🥬 🥬 `);
      return result;
    } catch (e) {
      console.log(e);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
    return 'failed?';
}
export async function getAssociations() {
    let result: any[];
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      console.log(`${mm} 🍎🍎🍎 Connected to MongoDB Atlas! 🍎🍎🍎 ${baySteps}`);
      // Send a ping to confirm a successful connection
      // await client.db('admin').command({ ping: 1 });
      console.log('${mm} 🍎🍎🍎 Attempting to find associations ..... 🍎🍎🍎');
      const db: Db = client.db('kasie_transie');
      console.log(
        `${mm} 🍎🍎🍎 Connected to MongoDB Atlas database: 🍎🍎🍎 ${db.databaseName}`,
      );

      result = await db.collection('Association').find().toArray();
      console.log(`${mm} 🍎🍎🍎 getAssociations found: 🥬 ${result.length} documents 🥬 🥬 `);
      return result;
    } catch (e) {
      console.error(e);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
    return 'failed?';
}