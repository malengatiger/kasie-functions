import { Db, InsertOneResult } from "mongodb";
import { client } from "../database/config";
// import { head, dbUser, door, cluster, db, tail, app } from "../database/constants";
// const baySteps = `${head}${dbUser}:${door}@${cluster}/${db}?${tail}&${app}`;
const mm = "association.api";
const dbName = "kasie_transie";
export async function getCountries(): Promise<any[]> {
  let result: any[] = [];
  try {
    await client.connect();
    // await client.db('admin').command({ ping: 1 });
    const db: Db = client.db(dbName);
    result = await db.collection("Country").find().toArray();
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
export async function getAssociations(): Promise<any[]> {
  let result: any[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection("Association").find().toArray();
    console.log(
      `${mm} 🍎🍎🍎 getAssociations found: 🥬 ${result.length} associations 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  return result;
}

export async function createSettings(settings: any): Promise<any> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection("SettingsModel").insertOne(settings);
    console.log(
      `${mm} 🍎🍎🍎 createSettings done: 🥬 ${result.insertedId}  🥬🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
export async function createAssociation(association: any): Promise<any> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection("Association").insertOne(association);
    console.log(
      `${mm} 🍎🍎🍎 createAssociation done: 🥬 ${result.insertedId}  🥬🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
export async function createAssociationUser(association: any): Promise<any> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection("User").insertOne(association);
    console.log(
      `${mm} 🍎🍎🍎 createAssociationUser done: 🥬 ${result.insertedId}  🥬🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
export async function getAssociationCars(
  associationId: string
): Promise<any[]> {
  let result: any[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db
      .collection("Vehicle")
      .find({ associationId: associationId })
      .toArray();
    console.log(
      `${mm} 🍎🍎🍎 getAssociationCars found: 🥬 ${result.length} cars 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  return result;
}
export async function getAssociationUsers(
  associationId: string
): Promise<any[]> {
  let result: any[] = [];
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db
      .collection("User")
      .find({ associationId: associationId })
      .toArray();
    console.log(
      `${mm} 🍎🍎🍎 getAssociationUsers found: 🥬 ${result.length} users 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  return result;
}
