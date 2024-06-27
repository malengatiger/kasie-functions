import {logger} from "firebase-functions/v1";
import {onRequest} from "firebase-functions/v2/https";
import {getAssociationCars, getAssociations, getCountries}
  from "../../../shared/src/api/association.api";
const mm = "assoc.functions";

export const findCountries = onRequest(async (request, response) => {
  logger.info("🍎 🍎 🍎 findCountries ....");
  const res = await getCountries();
  logger.log(`${mm} 🍎 🍎 🍎 🍎 🍎 🍎 result: ${res.length} countries`);
  response.send(res);
});

export const findAssociations = onRequest(async (request, response) => {
  logger.info("🍎 🍎 🍎 findAssociations ....");
  const res = await getAssociations();
  logger.log(`${mm} 🍎 🍎 🍎 🍎 🍎 🍎 result: ${res.length} associations`);
  response.send(res);
});

export const findAssociationVehicles = onRequest(async (request, response) => {
  logger.info("🍎 🍎 🍎 findAssociationVehicles ....");
  const associationId =
      request.query["associationId"] as string; // Type assertion
  if (!associationId) {
    response.status(400).send("Missing associationId parameter");
    return;
  }
  const res = await getAssociationCars(associationId);
  logger.log(`${mm} 🍎 found: ${res.length} cars`); // Corrected log message
  response.send(res);
});

