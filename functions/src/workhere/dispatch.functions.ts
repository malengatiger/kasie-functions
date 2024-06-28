import {logger} from "firebase-functions/v1";
import {onRequest} from "firebase-functions/v2/https";
import {createDispatchRecord, findDispatchRecordsByAssociation, findDispatchRecordsByMarshal, findDispatchRecordsByVehicle} from "../../../shared/src/api/dispatch.api";
const mm = 'dispatch.functions.ts';

export const insertDispatchRecord = onRequest(async (request, response) => {
  const body = request.body;
  logger.log(`🍎 🍎 🍎 🍎 🍎 🍎 ` +
      `insertDispatchRecord body: ${JSON.stringify(body)}`);
  const res = await createDispatchRecord(body);
  logger.log(`🍎 🍎 ${mm} insertDispatchRecord result: ${res}`);
  response.send(res);
});

export const listDispatchRecordsByVehicle = onRequest(async (request, response) => {
  const vehicleId: string = request.query['vehicleId'] as string;
    const fromDate: string = request.query["fromDate"] as string;
  const toDate: string = request.query["toDate"] as string;

  const res = await findDispatchRecordsByVehicle(vehicleId, fromDate, toDate);
  logger.log(
    `🍎 🍎 🍎 ${mm}: searchDispatchRecordsByVehicleId: ${res.length}`
  );
  response.send(res);
});

export const listDispatchRecordsByAssociation = onRequest(
  async (request, response) => {
    const associationId: string = request.query["associationId"] as string;
    const fromDate: string = request.query["fromDate"] as string;
    const toDate: string = request.query["toDate"] as string;

    const res = await findDispatchRecordsByAssociation(
      associationId,
      fromDate,
      toDate
    );
    logger.log(
      `🍎 🍎 🍎 ${mm}: listDispatchRecordsByAssociation: ${res.length}`
    );
    response.send(res);
  }
);

export const listDispatchRecordsByMarshal = onRequest(
  async (request, response) => {
    const userId: string = request.query["userId"] as string;
    const fromDate: string = request.query["fromDate"] as string;
    const toDate: string = request.query["toDate"] as string;

    const res = await findDispatchRecordsByMarshal(userId, fromDate, toDate);
    logger.log(`🍎 🍎 🍎 ${mm}: listDispatchRecordsByMarshal: ${res.length}`);
    response.send(res);
  }
);


