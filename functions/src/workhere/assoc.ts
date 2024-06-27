import {logger} from "firebase-functions/v1";
import {onRequest} from "firebase-functions/v2/https";
import {getAssociations, getCountries}
  from "../../../shared/src/api/association.api";

export const findCountries = onRequest(async (request, response) => {
  logger.info("🍎 🍎 🍎 findCountries ....");
  const res = await getCountries();
  logger.log(`🍎 🍎 🍎 🍎 🍎 🍎 result: ${res}`);
  response.send(res);
});

export const findAssociations = onRequest(async (request, response) => {
  logger.info("🍎 🍎 🍎 findAssociations ....");
  const res = await getAssociations();
  logger.log(`🍎 🍎 🍎 🍎 🍎 🍎 result: ${res}`);
  response.send(res);
});

export const hiYebo = onRequest((request, response) => {
  logger.info("🔼 🔼 🔼 hiYebo : Hello peasants! 🍎");
  response.send("🔼 🔼 🔼 Hello from Firebase! Cloud Functions! 🍎");
});
