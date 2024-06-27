import { Db } from "mongodb";
import { client } from "../database/config";
// import { head, dbUser, door, cluster, db, tail, app } from "../database/constants";
// const baySteps = `${head}${dbUser}:${door}@${cluster}/${db}?${tail}&${app}`;
const mm = 'association.api';
const dbName = 'kasie_transie';
export async function getCountries() : Promise<any[]> {
    let result: any[] = [];
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      // await client.db('admin').command({ ping: 1 });
      const db: Db = client.db(dbName);
      console.log(
        `🍎🍎🍎 Connected to MongoDB Atlas database: 🍎🍎🍎 ${db.databaseName}`,
      );

      result = await db.collection('Country').find().toArray();
      console.log(`${mm} 🍎🍎🍎 Found 🥬 ${result.length} countries 🥬 🥬 `);
      return result;
    } catch (e) {
      console.log(e);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
        return result;

}
export async function getAssociations() : Promise<any[]> {
    let result: any[] = [];
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      // await client.db('admin').command({ ping: 1 });
      const db: Db = client.db(dbName);
      console.log(
        `${mm} 🍎🍎🍎 Connected to MongoDB Atlas database: 🍎🍎🍎 ${db.databaseName}`,
      );

      result = await db.collection('Association').find().toArray();
      console.log(`${mm} 🍎🍎🍎 getAssociations found: 🥬 ${result.length} associations 🥬 🥬 `);
      return result;
    } catch (e) {
      console.error(e);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
    return result;
}


export async function getAssociationCars(associationId: string): Promise<any[]> {
    let result: any[] = [];
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();    
      const db: Db = client.db(dbName);
      console.log(
        `${mm} 🍎🍎🍎 Connected to MongoDB Atlas database: 🍎🍎🍎 ${db.databaseName}`,
      );

      result = await db.collection('Vehicle').find({associationId: associationId}).toArray();
      console.log(`${mm} 🍎🍎🍎 getAssociationCars found: 🥬 ${result.length} cars 🥬 🥬 `);
      return result;
    } catch (e) {
      console.error(e);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
    return result;
}