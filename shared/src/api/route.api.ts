import { Db, InsertManyResult, InsertOneResult } from "mongodb";
import { client } from "../database/config";
import { makeRouteQRCode } from "../utilities/upload_to_bucket";
// import { head, dbUser, door, cluster, db, tail, app } from "../database/constants";
// const baySteps = `${head}${dbUser}:${door}@${cluster}/${db}?${tail}&${app}`;
const mm = 'route.api';
const dbName = 'kasie_transie';

export async function updateRoute(
  routeId: string,
  qrCodeUrl: string
): Promise<any> {
  try {
    console.log(`${mm} updateRoute: ${routeId} 🎲 qrCodeUrl: ${qrCodeUrl}`);
    await client.connect();
    const db: Db = client.db(dbName);
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

    console.log(
      `${mm} ${result.matchedCount} car(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
export async function getRoutes() : Promise<any[]> {
    let result: any[] = [];
    try {
      await client.connect();
      const db: Db = client.db(dbName);
      result = await db.collection('Route').find().toArray();
      console.log(`${mm} 🍎🍎🍎 Found 🥬 ${result.length} routes 🥬 🥬 `);
      return result;
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
        return result;

}
export async function getAssociationRoutes(associationId: string): Promise<any[]> {
  let result: any[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection("Route").find({associationId: associationId}).toArray();
    console.log(`${mm} 🍎🍎🍎 Found 🥬 ${result.length} association routes 🥬 🥬 `);
    return result;
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
  return result;
}

export async function getRoutesByLocation(
  latitude: number,
  longitude: number,
  radius: number,
  associationId?: string
): Promise<any[]> {
  let result: any[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db
      .collection("Route")
      .find({ associationId: associationId })
      .toArray();
    console.log(
      `${mm} 🍎🍎🍎 Found 🥬 ${result.length} association routes 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.log(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  return result;
}

export async function listLandmarksByLocation(
  latitude: number,
  longitude: number,
  radius: number,
  associationId?: string
): Promise<any[]> {
  let result: any[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db
      .collection("Landmark")
      .find({ associationId: associationId })
      .toArray();
    console.log(
      `${mm} 🍎🍎🍎 Found 🥬 ${result.length} association routes 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.log(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  return result;
}

export async function createRoute(route: any): Promise<any> {
  let result: InsertOneResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection("Route").insertOne(route);
    const url = await makeRouteQRCode(route.routeId, route.name);
    await updateRoute(route.routeId, url);
    console.log(
      `${mm} 🍎🍎🍎 createARoute done: 🥬 ${JSON.stringify(result)}  🥬🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
export async function createRoutePoints(routePoints: any): Promise<any> {
  let result: InsertManyResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection("RoutePoint").insertMany(routePoints);
    console.log(
      `${mm} 🍎🍎🍎 createRoutePoints done: 🥬 ${JSON.stringify(result)}  🥬🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
export async function createRouteLandmarks(routeLandmarks: any): Promise<any> {
  let result: InsertManyResult;
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    result = await db.collection("RouteLandmark").insertMany(routeLandmarks);
    console.log(
      `${mm} 🍎🍎🍎 createRouteLandmarks done: 🥬 ${JSON.stringify(
        result
      )}  🥬🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
export async function getRoutePoints(routeId: string): Promise<any[]> {
    let result: any[] = [];
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();    
      const db: Db = client.db(dbName);
      console.log(
        `${mm} 🍎🍎🍎 Connected to MongoDB Atlas database: 🍎🍎🍎 ${db.databaseName}`,
      );

      result = await db.collection('RoutePoint').find({routeId: routeId}).toArray();
      console.log(
        `${mm} 🍎🍎🍎 getRoutePoints found: 🥬 ${result.length} points 🥬 🥬 `
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
export async function getRouteLandmarks(routeId: string): Promise<any[]> {
  let result: any[] = [];
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db: Db = client.db(dbName);
    console.log(
      `${mm} 🍎🍎🍎 Connected to MongoDB Atlas database: 🍎🍎🍎 ${db.databaseName}`
    );

    result = await db
      .collection("RouteLandmark")
      .find({ routeId: routeId })
      .toArray();
    console.log(
      `${mm} 🍎🍎🍎 getRouteLandmarks found: 🥬 ${result.length} points 🥬 🥬 `
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