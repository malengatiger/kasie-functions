import { Db, InsertManyResult, ObjectId } from "mongodb";
import { client } from "../database/config";
import { makeRouteQRCode } from "../utilities/upload_to_bucket";
import { Route } from "../models/Route";
import { handleError } from "./error.api";
import { RoutePoint } from "../models/RoutePoint";
import { RouteLandmark } from "../models/RouteLandmark";
const mm = "route.api";
const dbName = "kasie_transie";

export async function updateRouteQRCode(
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
      `${mm} ${result.matchedCount} car(s) matched the filter, 
      updated ${result.modifiedCount} document(s)`
    );
    return result;
  } catch (e) {
    console.error(e);
    handleError(`updateRoute: ${routeId} 🎲 qrCodeUrl: ${qrCodeUrl}`, {
      routeId: routeId,
    });
    throw new Error(`updateRoute: ${e}`);
  } finally {
    await client.close();
  }
}
export async function getRoutes(): Promise<Route[]> {
  let result: Route[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    const list = await db.collection("Route").find().toArray();
    console.log(`${mm} 🍎🍎🍎 Found 🥬 ${list.length} routes 🥬 🥬 `);
    build(list, result);
    return result;
  } catch (e) {
    console.log(e);
    handleError(`getRoutes: ${e}`, {});
    throw new Error(`getRoutes: ${e}`);
  } finally {
    await client.close();
  }
  return result;
}
export async function getAssociationRoutes(
  associationId: string
): Promise<any[]> {
  let result: Route[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    const list = await db
      .collection("Route")
      .find({ associationId: associationId })
      .toArray();
    console.log(
      `${mm} 🍎🍎🍎 Found 🥬 ${list.length} association routes 🥬 🥬 `
    );
    build(list, result);
    return result;
  } catch (e) {
    console.log(e);
    handleError(`getAssociationRoutes: ${e}`, {});
    throw new Error(`getAssociationRoutes: ${e}`);
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
): Promise<Route[]> {
  let result: Route[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    const list = await db
      .collection("Route")
      .find({ associationId: associationId })
      .toArray();
    console.log(
      `${mm} 🍎🍎🍎 Found 🥬 ${result.length} association routes 🥬 🥬 `
    );
    build(list, result);
    return result;
  } catch (e) {
    console.log(e);
    handleError(`getRoutesByLocation: ${e}`, {});
    throw new Error(`getRoutesByLocation: ${e}`);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  return result;
}
function build(list: any[], routes: Route[]) {
  list.forEach((route) => {
    const r = <Route>{};
    r.routeId = route.routeId;
    r.associationId = route.associationId;
    r.associationName = route.associationName;
    r.name = route.name;
    r.active = route.active;
    r.qrCodeUrl = route.qrCodeUrl;
    r.routeNumber = route.routeNumber;
    r.countryName = route.countryName;
    r.countryId = route.countryId;
    routes.push(r);
  });
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
     handleError(`listLandmarksByLocation: ${e}`, {
      associationId: associationId
     });
    throw new Error(`listLandmarksByLocation: ${e}`);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  return result;
}

export async function createRoute(route: Route): Promise<Route> {
  const resp = <Route>{};
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    await db.collection("Route").insertOne(route);
    route = await makeRouteQRCode(route);
    console.log(
      `${mm} 🍎🍎🍎 createRoute done: 🥬 ${JSON.stringify(route)}  🥬🥬 `
    );
    resp.routeId = route.routeId;
    resp.associationId = route.associationId;
    resp.associationName = route.associationName;
    resp.name = route.name;
    resp.active = 0;
    resp.qrCodeUrl = route.qrCodeUrl;
    resp.routeNumber = route.routeNumber;
    resp.countryName = route.countryName;
    resp.countryId = route.countryId;

    return resp;
  } catch (e) {
    console.error(e);
    handleError(`createRoute: ${e}`, {});
    throw new Error(`createRoute: ${e}`);
  } finally {
    await client.close();
  }
  return resp;
}
export async function createRoutePoints(
  routePoints: RoutePoint[]
): Promise<any> {
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
    handleError(`createRoutePoints: ${e}`, {
      routeId: routePoints[0].routeId,
    });
    throw new Error(`createRoutePoints: ${e}`);
  } finally {
    await client.close();
  }
}
export async function createRouteLandmarks(
  routeLandmarks: RouteLandmark[]
): Promise<InsertManyResult> {
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
    handleError(`createRouteLandmarks: ${e}`, {
      routeId: routeLandmarks[0].routeId,
    });
    throw new Error(`createRouteLandmarks: ${e}`);
  } finally {
    await client.close();
  }
}
export async function getRoutePoints(routeId: string): Promise<RoutePoint[]> {
  let routePoints: RoutePoint[] = [];
  try {
    await client.connect();
    const db: Db = client.db(dbName);
    console.log(
      `${mm} 🍎🍎🍎 Connected to MongoDB Atlas database: 🍎🍎🍎 ${db.databaseName}`
    );

    const list = await db
      .collection("RoutePoint")
      .find({ routeId: routeId })
      .toArray();
      list.forEach((point) => {
        routePoints.push({
          routePointId: point.routePointId,
          routeId: point.routeId,
          associationId: point.associationId,
          created: point.created,
          heading: point.heading,
          index: point.index,
          position: point.position,
          _partitionKey: "",
          _id: new ObjectId(),
        });
      });
    console.log(
      `${mm} 🍎🍎🍎 getRoutePoints found: 🥬 ${routePoints.length} points 🥬 🥬 `
    );
    return routePoints;
  } catch (e) {
    console.error(e);
    handleError(`getRoutePoints: ${e}`, {
      routeId: routeId,
    });
    throw new Error(`getRoutePoints: ${e}`);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  return routePoints;
}
export async function getRouteLandmarks(routeId: string): Promise<RouteLandmark[]> {
  let result: RouteLandmark[] = [];
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db: Db = client.db(dbName);
    console.log(
      `${mm} 🍎🍎🍎 Connected to MongoDB Atlas database: 🍎🍎🍎 ${db.databaseName}`
    );

    const list = await db
      .collection("RouteLandmark")
      .find({ routeId: routeId })
      .toArray();
      list.forEach((point) => {
        result.push({
          _partitionKey: "",
          _id: point._id,
          routeId: point.routeId,
          routePointId: point.routePointId,
          associationId: point.associationId,
          index: point.index,
          routePointIndex: point.routePointIndex,
          routeName: point.routeName,
          landmarkId: point.landmarkId,
          landmarkName: point.land,
          created: point.created,
          position: point.position,
        });
      });
    console.log(
      `${mm} 🍎🍎🍎 getRouteLandmarks found: 🥬 ${result.length} points 🥬 🥬 `
    );
    return result;
  } catch (e) {
    console.error(e);
      handleError(`getRouteLandmarks: ${e}`, {
      routeId: routeId,
    });
    throw new Error(`getRouteLandmarks: ${e}`);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  return result;
}
