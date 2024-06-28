import { logger } from "firebase-functions/v1";
import { onRequest } from "firebase-functions/v2/https";
import {
  createRoute,
  createRouteLandmarks,
  createRoutePoints,
  getAssociationRoutes,
  getRouteLandmarks,
  getRoutePoints,
  getRoutes,
  getRoutesByLocation,
} from "../../../shared/src/api/route.api";
const mm = "route.functions";

export const insertRoute = onRequest(async (request, response) => {
  const body = request.body;
  logger.log(`🍎 🍎 ` + `insertRoute body: ${JSON.stringify(body)}`);
  const res = await createRoute(body);
  logger.log(`🍎 🍎 ${mm} insertRoute result: ${res}`);
  response.send(res);
});

export const insertRoutePoints = onRequest(async (request, response) => {
  const body = request.body;
  logger.log(`🍎 🍎 ` + `insertRoutePoints body: ` + `${JSON.stringify(body)}`);
  const res = await createRoutePoints(body);
  logger.log(`🍎 🍎 ${mm} insertRoutePoints result: ${res}`);
  response.send(res);
});

export const insertRouteLandmarks = onRequest(async (request, response) => {
  const body = request.body;
  logger.log(
    `🍎 🍎 ` + `insertRouteLandmarks body: ` + `${JSON.stringify(body)}`
  );
  const res = await createRouteLandmarks(body);
  logger.log(`🍎 🍎 ${mm} insertRouteLandmarks result: ${res}`);
  response.send(res);
});
//
export const listRouteLandmarks = onRequest(async (request, response) => {
  const routeId: string = request.query["routeId"] as string;
  const res = await getRouteLandmarks(routeId);
  logger.log(`🍎 🍎 ${mm}: listRoutes: ${res.length}`);
  response.send(res);
});

export const listRoutePoints = onRequest(async (request, response) => {
  const routeId: string = request.query["routeId"] as string;
  const res = await getRoutePoints(routeId);
  logger.log(`🍎 🍎 ${mm}: listRoutes: ${res.length}`);
  response.send(res);
});

export const listRoutes = onRequest(async (request, response) => {
  const res = await getRoutes();
  logger.log(`🍎 🍎 ${mm}: listRoutes: ${res.length}`);
  response.send(res);
});

export const listRoutesByLocation = onRequest(async (request, response) => {
  const latitude: number = parseFloat(request.query["latitude"] as string);
  const longitude: number = parseFloat(request.query["longitude"] as string);
  const radius: number = parseFloat(request.query["radius"] as string);

  const res = await getRoutesByLocation(latitude, longitude, radius);
  logger.log(`🍎 🍎 ${mm}: listRoutesByLocation: ${res.length}`);
  response.send(res);
});

export const listAssociationRoutes = onRequest(async (request, response) => {
  const associationId: string = request.query["associationId"] as string;
  const res = await getAssociationRoutes(associationId);
  logger.log(`🍎 🍎 ${mm}: listAssociationRoutes: ${res.length}`);
  response.send(res);
});
