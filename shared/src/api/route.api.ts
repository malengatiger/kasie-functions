import { Db, InsertManyResult, InsertOneResult } from "mongodb";
import { client } from "../database/config";
// import { head, dbUser, door, cluster, db, tail, app } from "../database/constants";
// const baySteps = `${head}${dbUser}:${door}@${cluster}/${db}?${tail}&${app}`;
const mm = 'route.api';
const dbName = 'kasie_transie';
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