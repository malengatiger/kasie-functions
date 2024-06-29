import { onRequest } from "firebase-functions/v1/https";
import { logger } from "firebase-functions/v1";
import {
  insertDispatchRecord,
  listDispatchRecordsByAssociation,
  listDispatchRecordsByMarshal,
  listDispatchRecordsByVehicle,
} from "./workhere/dispatch.functions";
import {
  addAssociation,
  addAssociationUser,
  createVehicle,
  findAssociations,
  findAssociationVehicles,
  findCountries,
  insertSettings,
} from "./workhere/assoc.functions";
import {
  insertRoute,
  insertRouteLandmarks,
  insertRoutePoints,
  listAssociationRoutes,
  listRouteLandmarks,
  listRoutePoints,
  listRoutes,
  listRoutesByLocation,
} from "./workhere/route.functions";
import { insertPassengerCount, listPassengerCountsByAmbassador, listPassengerCountsByAssociation, listPassengerCountsByVehicle } from "./workhere/ambassador.functions";
import { insertHeartbeat, insertVehicleArrival, insertVehicleDeparture, insertVehiclePhoto, insertVehicleVideo, listVehicleArrivals, listVehicleDepartures, listVehicleHeartbeats, listVehiclePhotos, listVehicleVideos } from "./workhere/vehicle.functions";
import { uploadFileZ } from "./workhere/cs.functions";


//dispatch functions
export const addDispatchRecord = insertDispatchRecord;
export const getDispatchRecordsByVehicle = listDispatchRecordsByVehicle;
export const getDispatchRecordsByAssociation = listDispatchRecordsByAssociation;
export const getDispatchRecordsByMarshal = listDispatchRecordsByMarshal;

//association functions
export const registerAssociationUser = addAssociationUser;
export const registerAssociation = addAssociation;
export const addSettings = insertSettings;
export const addVehicle = createVehicle;

export const getAssociations = findAssociations;
export const getAssociationCars = findAssociationVehicles;

//route functions
export const addRoute = insertRoute;
export const addRoutePoints = insertRoutePoints;
export const addRouteLandmarks = insertRouteLandmarks;
export const getRoutePoints = listRoutePoints;
export const getRouteLandmarks = listRouteLandmarks;
export const getAssociationRoutes = listAssociationRoutes;
export const getRoutes = listRoutes;
export const getRoutesByLocation = listRoutesByLocation;

//ambassador functions
export const addPassengerCount = insertPassengerCount;
export const getPassengerCountByVehicle = listPassengerCountsByVehicle;
export const getPassengerCountsByAssociation = listPassengerCountsByAssociation;
export const getPassengerCountsByAmbassador = listPassengerCountsByAmbassador;

//vehicle functions
export const addVehicleHeartbeat = insertHeartbeat;
export const addVehiclePhoto = insertVehiclePhoto;
export const addVehicleVideo = insertVehicleVideo;
export const addVehicleArrival = insertVehicleArrival;
export const addVehicleDeparture = insertVehicleDeparture;

export const getVehiclePhotos = listVehiclePhotos;
export const getVehicleVideos = listVehicleVideos;
export const getVehicleHeartbeats = listVehicleHeartbeats;
export const getVehicleArrivals = listVehicleArrivals;
export const getVehicleDepartures = listVehicleDepartures;

//cloud storage functions
// export const uploadFile = uploadFileX;
export const uploadFilesToCloudStorage = uploadFileZ;
// export const downloadFile = downloadFileX;
//generics
export const getCountries = findCountries;
export const hiYebo = onRequest((request, response) => {
  logger.info("🔼 🔼 🔼 hiYebo : Hello peasants! 🍎");
  response.send(
    "🔼 🔼 🔼 Hello from Firebase. " + "Cloud Functions are presenting ....! 🍎"
  );
});

/*
Function URL (addDispatchRecord(us-central1)): https://adddispatchrecord-w5bxtmmbsa-uc.a.run.app
Function URL (getDispatchRecordsByVehicleId(us-central1)): https://getdispatchrecordsbyvehicleid-w5bxtmmbsa-uc.a.run.app
Function URL (registerAssociationUser(us-central1)): https://registerassociationuser-w5bxtmmbsa-uc.a.run.app
Function URL (registerAssociation(us-central1)): https://registerassociation-w5bxtmmbsa-uc.a.run.app
Function URL (addSettings(us-central1)): https://addsettings-w5bxtmmbsa-uc.a.run.app
Function URL (getAssociations(us-central1)): https://getassociations-w5bxtmmbsa-uc.a.run.app
Function URL (getAssociationCars(us-central1)): https://getassociationcars-w5bxtmmbsa-uc.a.run.app
Function URL (addRoute(us-central1)): https://addroute-w5bxtmmbsa-uc.a.run.app
Function URL (addRoutePoints(us-central1)): https://addroutepoints-w5bxtmmbsa-uc.a.run.app
Function URL (addRouteLandmarks(us-central1)): https://addroutelandmarks-w5bxtmmbsa-uc.a.run.app
Function URL (getRoutePoints(us-central1)): https://getroutepoints-w5bxtmmbsa-uc.a.run.app
Function URL (getRouteLandmarks(us-central1)): https://getroutelandmarks-w5bxtmmbsa-uc.a.run.app
Function URL (getAssociationRoutes(us-central1)): https://getassociationroutes-w5bxtmmbsa-uc.a.run.app
Function URL (getRoutes(us-central1)): https://getroutes-w5bxtmmbsa-uc.a.run.app
Function URL (getRoutesByLocation(us-central1)): https://getroutesbylocation-w5bxtmmbsa-uc.a.run.app
Function URL (getCountries(us-central1)): https://getcountries-w5bxtmmbsa-uc.a.run.app
Function URL (hiYebo(us-central1)): https://us-central1-kasie2024.cloudfunctions.net/hiYebo
*/
