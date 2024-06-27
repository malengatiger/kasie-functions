import {logger} from "firebase-functions/v1";
import {onRequest} from "firebase-functions/v2/https";
import {createDispatchRecord, findDispatchRecordsByVehicleId} from "../../../shared/src/api/dispatch.api";
const mm = 'dispatch.functions.ts';
export const insertDispatchRecord = onRequest(async (request, response) => {
  const body = request.body;
  logger.log(`🍎 🍎 🍎 🍎 🍎 🍎 ` +
      `insertDispatchRecord body: ${JSON.stringify(body)}`);
  const res = await createDispatchRecord(body);
  logger.log(`🍎 🍎 ${mm} insertDispatchRecord result: ${res}`);
  response.send(res);
});

export const searchDispatchRecordsByVehicleId = onRequest(async (request, response) => {
  const vehicleId: string = request.query['vehicleId'] as string;
  const res = await findDispatchRecordsByVehicleId(vehicleId);
  logger.log(
    `🍎 🍎 🍎 ${mm}: searchDispatchRecordsByVehicleId: ${res.length}`
  );
  response.send(res);
});

