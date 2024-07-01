import { logger } from "firebase-functions/v1";
import { onRequest } from "firebase-functions/v2/https";

import {
  createCommuter,
  createCommuterRequest,
  createCommuterResponse,
} from "../../../shared/src/api/commuter.api";

const mm = "💛 💛 💛 commuter.functions";

export const insertCommuter = onRequest(async (request, response) => {
  const body = request.body;
  logger.log(
    `🍎 🍎 🍎 🍎 🍎 🍎 ` + `insertVehicle body: ${JSON.stringify(body)}`
  );
  const res = await createCommuter(body);
  logger.log(`🍎 🍎 ${mm} insertCommuter result: ${res}`);
  response.send(res);
});

export const insertCommuterRequest = onRequest(async (request, response) => {
  const body = request.body;
  logger.log(
    `🍎 🍎 🍎 🍎 🍎 🍎 ` + `insertHeartbeat body: ${JSON.stringify(body)}`
  );
  const res = await createCommuterRequest(body);
  logger.log(`🍎 🍎 ${mm} insertCommuterRequest result: ${res}`);
  response.send(res);
});

export const insertCommuterResponse = onRequest(async (request, response) => {
  const body = request.body;
  logger.log(
    `🍎 🍎  ` + `insertCommuterResponse body: ${JSON.stringify(body)}`
  );
  const res = await createCommuterResponse(body);
  logger.log(`🍎 🍎 ${mm} insertCommuterResponse result: ${res}`);
  response.send(res);
});
