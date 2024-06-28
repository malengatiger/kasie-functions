import {logger} from "firebase-functions/v1";
import {onRequest} from "firebase-functions/v2/https";
import {createAssociation, createAssociationUser, createCar, createSettings, getAssociationCars, getAssociations, getCountries}
  from "../../../shared/src/api/association.api";
const mm = "assoc.functions";

export const findCountries = onRequest(async (request, response) => {
  const res = await getCountries();
  logger.log(`${mm} 🍎 🍎 🍎 🍎 🍎 🍎 result: ${res.length} countries`);
  response.send(res);
});
//
export const findAssociations = onRequest(async (request, response) => {
  const res = await getAssociations();
  logger.log(`${mm} 🍎 🍎 🍎 🍎 🍎 🍎 result: ${res.length} associations`);
  response.send(res);
});
//
export const findAssociationVehicles = onRequest(async (request, response) => {
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
//
export const addAssociation = onRequest(async (request, response) => {
  const association = request.body;; // Type assertion
  
  const res = await createAssociation(association);
  logger.log(`${mm} 🍎 addAssociation done: ${JSON.stringify(res)} `); // Corrected log message
  response.send(res);
});

export const createVehicle = onRequest(async (request, response) => {
  const car = request.body; // Type assertion
  const res = await createCar(car);
  logger.log(`${mm} 🍎 addVehicle done: ${JSON.stringify(res)}`); // Corrected log message
  response.send(res);
});

export const addAssociationUser = onRequest(async (request, response) => {
  const user = request.body; // Type assertion

  const res = await createAssociationUser(user);
  logger.log(`${mm} 🍎 found: ${res.length} cars`); // Corrected log message
  response.send(res);
});
export const insertSettings = onRequest(async (request, response) => {
  const settings = request.body; // Type assertion
  const res = await createSettings(settings);
  logger.log(`${mm} 🍎 addSettings done: ${JSON.stringify(res)} `); // Corrected log message
  response.send(res);
});

