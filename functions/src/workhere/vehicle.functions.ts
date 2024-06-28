import { logger } from "firebase-functions/v1";
import { onRequest } from "firebase-functions/v2/https";
import {
  createHeartbeat,
  createVehicleArrival,
  createVehicleDeparture,
  createVehiclePhoto,
  createVehicleVideo,
  findVehicleArrivals,
  findVehicleDepartures,
  findVehicleHeartbeats,
  findVehiclePhotos,
  findVehicleVideos,
} from "../../../shared/src/api/vehicle.api";
const mm = "ambassador.functions";

export const insertHeartbeat = onRequest(async (request, response) => {
  const body = request.body;
  logger.log(
    `🍎 🍎 🍎 🍎 🍎 🍎 ` + `insertHeartbeat body: ${JSON.stringify(body)}`
  );
  const res = await createHeartbeat(body);
  logger.log(`🍎 🍎 ${mm} insertHeartbeat result: ${res}`);
  response.send(res);
});

export const insertVehiclePhoto = onRequest(async (request, response) => {
  const body = request.body;
  logger.log(
    `🍎 🍎 🍎 🍎 🍎 🍎 ` + `insertVehiclePhoto body: ${JSON.stringify(body)}`
  );
  const res = await createVehiclePhoto(body);
  logger.log(`🍎 🍎 ${mm} insertVehiclePhoto result: ${res}`);
  response.send(res);
});

export const insertVehicleArrival = onRequest(async (request, response) => {
  const body = request.body;
  logger.log(
    `🍎 🍎 🍎 🍎 🍎 🍎 ` + `insertVehicleArrival body: ${JSON.stringify(body)}`
  );
  const res = await createVehicleArrival(body);
  logger.log(`🍎 🍎 ${mm} insertVehicleArrival result: ${res}`);
  response.send(res);
});

export const insertVehicleDeparture= onRequest(async (request, response) => {
  const body = request.body;
  logger.log(
    `🍎 🍎 🍎 🍎 🍎 🍎 ` +
      `insertVehicleDeparture body: ${JSON.stringify(body)}`
  );
  const res = await createVehicleDeparture(body);
  logger.log(`🍎 🍎 ${mm} insertVehicleDeparture result: ${res}`);
  response.send(res);
});


export const insertVehicleVideo = onRequest(async (request, response) => {
  const body = request.body;
  logger.log(
    `🍎 🍎 🍎 🍎 🍎 🍎 ` + `insertVehicleVideo body: ${JSON.stringify(body)}`
  );
  const res = await createVehicleVideo(body);
  logger.log(`🍎 🍎 ${mm} insertVehicleVideo result: ${res}`);
  response.send(res);
});

export const listVehiclePhotos = onRequest(async (request, response) => {
  const vehicleId: string = request.query["vehicleId"] as string;

  const res = await findVehiclePhotos(vehicleId);
  logger.log(`🍎 🍎 🍎 ${mm}: listVehiclePhotos: ${res.length}`);
  response.send(res);
});

export const listVehicleVideos = onRequest(async (request, response) => {
  const vehicleId: string = request.query["vehicleId"] as string;

  const res = await findVehicleVideos(vehicleId);
  logger.log(`🍎 🍎 🍎 ${mm}: listVehicleVideos: ${res.length}`);
  response.send(res);
});

export const listVehicleHeartbeats = onRequest(async (request, response) => {
  const vehicleId: string = request.query["vehicleId"] as string;
  const fromDate: string = request.query["fromDate"] as string;
  const toDate: string = request.query["toDate"] as string;

  const res = await findVehicleHeartbeats(vehicleId, fromDate, toDate);
  logger.log(`🍎 🍎 🍎 ${mm}: listVehicleHeartbeats: ${res.length}`);
  response.send(res);
});

export const listVehicleArrivals = onRequest(async (request, response) => {
  const vehicleId: string = request.query["vehicleId"] as string;
  const fromDate: string = request.query["fromDate"] as string;
  const toDate: string = request.query["toDate"] as string;

  const res = await findVehicleArrivals(vehicleId, fromDate, toDate);
  logger.log(`🍎 🍎 🍎 ${mm}: listVehicleArrivals: ${res.length}`);
  response.send(res);
});

export const listVehicleDepartures = onRequest(async (request, response) => {
  const vehicleId: string = request.query["vehicleId"] as string;
  const fromDate: string = request.query["fromDate"] as string;
  const toDate: string = request.query["toDate"] as string;

  const res = await findVehicleDepartures(vehicleId, fromDate, toDate);
  logger.log(`🍎 🍎 🍎 ${mm}: listVehicleDepartures: ${res.length}`);
  response.send(res);
});
