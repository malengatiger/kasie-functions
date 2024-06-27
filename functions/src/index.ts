
import {onRequest} from "firebase-functions/v1/https";
import {logger} from "firebase-functions/v1";
import {insertDispatchRecord, searchDispatchRecordsByVehicleId} from "./workhere/dispatch.functions";
import {findAssociations, findAssociationVehicles, findCountries}
  from "./workhere/assoc.functions";

//dispatch functions
export const addDispatchRecord = insertDispatchRecord;
export const getDispatchRecordsByVehicleId = searchDispatchRecordsByVehicleId;
//association functions
export const getCountries = findCountries;
export const getAssociations = findAssociations;
export const getAssociationCars = findAssociationVehicles;

export const hiYebo = onRequest((request, response) => {
  logger.info("🔼 🔼 🔼 hiYebo : Hello peasants! 🍎");
  response.send("🔼 🔼 🔼 Hello from Firebase. " +
    "Cloud Functions are presenting ....! 🍎");
});


