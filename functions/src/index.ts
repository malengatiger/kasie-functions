
import {getAssociations, getCountries}
  from "../../shared/src/api/association.api";
import {onRequest} from "firebase-functions/v1/https";
import {logger} from "firebase-functions/v1";

const mm = "INDEX";

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

export const hiYebo = onRequest((request, response) => {
  logger.info("🔼 🔼 🔼 hiYebo : Hello peasants! 🍎");
  response.send("🔼 🔼 🔼 Hello from Firebase! Cloud Functions! 🍎");
});

