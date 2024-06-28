import { logger } from "firebase-functions/v1";
import { onRequest } from "firebase-functions/v2/https";
import {
  createPassengerCount,
  findPassengerCountsByAmbassador,
  findPassengerCountsByAssociation,
  findPassengerCountsByVehicle,
} from "../../../shared/src/api/ambassador.api";
const mm = "ambassador.functions";

export const insertPassengerCount = onRequest(async (request, response) => {
  const body = request.body;
  logger.log(
    `🍎 🍎 🍎 🍎 🍎 🍎 ` + `insertPassengerCount body: ${JSON.stringify(body)}`
  );
  const res = await createPassengerCount(body);
  logger.log(`🍎 🍎 ${mm} insertDispatchRecord result: ${res}`);
  response.send(res);
});

export const listPassengerCountsByVehicle = onRequest(
  async (request, response) => {
    const vehicleId: string = request.query["vehicleId"] as string;
    const fromDate: string = request.query["fromDate"] as string;
    const toDate: string = request.query["toDate"] as string;

    const res = await findPassengerCountsByVehicle(vehicleId, fromDate, toDate);
    logger.log(
      `🍎 🍎 🍎 ${mm}: searchDispatchRecordsByVehicleId: ${res.length}`
    );
    response.send(res);
  }
);

export const listPassengerCountsByAssociation = onRequest(
  async (request, response) => {
    const associationId: string = request.query["associationId"] as string;
    const fromDate: string = request.query["fromDate"] as string;
    const toDate: string = request.query["toDate"] as string;

    const res = await findPassengerCountsByAssociation(
      associationId,
      fromDate,
      toDate
    );
    logger.log(
      `🍎 🍎 🍎 ${mm}: listPassengerCountsByAssociation: ${res.length}`
    );
    response.send(res);
  }
);

export const listPassengerCountsByAmbassador = onRequest(
  async (request, response) => {
    const userId: string = request.query["userId"] as string;
    const fromDate: string = request.query["fromDate"] as string;
    const toDate: string = request.query["toDate"] as string;

    const res = await findPassengerCountsByAmbassador(userId, fromDate, toDate);
    logger.log(
      `🍎 🍎 🍎 ${mm}: listPassengerCountsByAmbassador: ${res.length}`
    );
    response.send(res);
  }
);
