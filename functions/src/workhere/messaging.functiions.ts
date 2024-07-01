import { logger } from "firebase-functions/v1";
import { onRequest } from "firebase-functions/v2/https";

import { sendCommuterRequestMessageApi, sendDispatchMessageApi, sendPassengerCountMessageApi, sendVehicleArrivalMessageApi, sendVehicleDepartureMessageApi, sendVehicleHeartbeatMessageApi } from "../../../shared/src/api/fcm.messaging.api";

const mm = "💛 💛 💛 commuter.functions";

export const sendVehicleArrivalMessage = onRequest(async (request, response) => {
  const body = request.body;
  const res = await sendVehicleArrivalMessageApi(body);
  logger.log(`🍎 🍎 ${mm} sendVehicleArrivalMessage result: ${res}`);
  response.send(res);
});

export const sendVehicleDepartureMessage = onRequest(async (request, response) => {
  const body = request.body;
  const res = await sendVehicleDepartureMessageApi(body);
  logger.log(`🍎 🍎 ${mm} sendVehicleDepartureMessage result: ${res}`);
  response.send(res);
});

export const sendVehicleHeartbeatMessage = onRequest(async (request, response) => {
  const body = request.body;
  const res = await sendVehicleHeartbeatMessageApi(body);
  logger.log(`🍎 🍎 ${mm} sendVehicleHeartbeatMessage result: ${res}`);
  response.send(res);
});

export const sendCommuterRequestMessage = onRequest(async (request, response) => {
  const body = request.body;
  const res = await sendCommuterRequestMessageApi(body);
  logger.log(`🍎 🍎 ${mm} sendCommuterRequestMessage result: ${res}`);
  response.send(res);
});
export const sendPassengerCountMessage = onRequest(async (request, response) => {
  const body = request.body;
  const res = await sendPassengerCountMessageApi(body);
  logger.log(`🍎 🍎 ${mm} sendPassengerCountMessage result: ${res}`);
  response.send(res);
});
export const sendDispatchMessage = onRequest(async (request, response) => {
  const body = request.body;
  const res = await sendDispatchMessageApi(body);
  logger.log(`🍎 🍎 ${mm} sendDispatchMessage result: ${res}`);
  response.send(res);
});


