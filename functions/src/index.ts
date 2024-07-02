// import { onRequest } from "firebase-functions/v1/https";
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
import { generateQRCode, insertHeartbeat, insertVehicleArrival, insertVehicleDeparture, insertVehiclePhoto, insertVehicleVideo, listVehicleArrivals, listVehicleDepartures, listVehicleHeartbeats, listVehiclePhotos, listVehicleVideos, updateCarQRCodeX } from "./workhere/vehicle.functions";
import { downloadFileByName, downloadUsingUrl, uploadFileZ } from "./workhere/cloud_storage.functions";

import * as admin from "firebase-admin";
import { insertCommuter, insertCommuterRequest, insertCommuterResponse } from "./workhere/commuter.functions";
import { onRequest } from "firebase-functions/v2/https";
const app = admin.initializeApp();
console.log(`🎲 🎲 🎲 initializeApp completed:  🅿️  ${app.name} 🅿️ `);
console.log(
  `🎲 🎲 🎲 initializeApp completed, options:  🅿️  ${JSON.stringify(
    app.options
  )} 🅿️ `
);

//dispatch functions
export const addDispatchRecord = insertDispatchRecord;
export const getDispatchRecordsByVehicle = listDispatchRecordsByVehicle;
export const getDispatchRecordsByAssociation = listDispatchRecordsByAssociation;
export const getDispatchRecordsByMarshal = listDispatchRecordsByMarshal;

//association functions
export const registerAssociationUser = addAssociationUser;
export const registerAssociation = addAssociation;
export const addSettings = insertSettings;

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
export const addVehicle = createVehicle;
export const getQRCode = generateQRCode;
export const addVehicleHeartbeat = insertHeartbeat;
export const addVehiclePhoto = insertVehiclePhoto;
export const addVehicleVideo = insertVehicleVideo;
export const addVehicleArrival = insertVehicleArrival;
export const addVehicleDeparture = insertVehicleDeparture;
export const updateVehicleQRCode = updateCarQRCodeX;

export const getVehiclePhotos = listVehiclePhotos;
export const getVehicleVideos = listVehicleVideos;
export const getVehicleHeartbeats = listVehicleHeartbeats;
export const getVehicleArrivals = listVehicleArrivals;
export const getVehicleDepartures = listVehicleDepartures;

//cloud storage functions
export const uploadFilesToCloudStorage = uploadFileZ;
export const downloadCloudStorageFile = downloadFileByName;
export const downloadFileFromWeb = downloadUsingUrl;

//commuter functions
export const addCommuter = insertCommuter;
export const addCommuterRequest = insertCommuterRequest;
export const addCommuterResponse = insertCommuterResponse;

//FCM messaging functions

//generics
export const getCountries = findCountries;
export const hiYebo = onRequest((_request, response) => {
  logger.info("🔼 🔼 🔼 hiYebo : Hello peasants! 🍎");
  response.send(
    "🔼 🔼 🔼 🍎 Hello from Firebase. " +
      "Cloud Functions are presenting ....! 🍎 🍎 🍎 🍎"
  );
});

/*
Function URL (addDispatchRecord(us-central1)): https://adddispatchrecord-w5bxtmmbsa-uc.a.run.app
Function URL (getDispatchRecordsByVehicle(us-central1)): https://getdispatchrecordsbyvehicle-w5bxtmmbsa-uc.a.run.app
Function URL (getDispatchRecordsByAssociation(us-central1)): https://getdispatchrecordsbyassociation-w5bxtmmbsa-uc.a.run.app
Function URL (getDispatchRecordsByMarshal(us-central1)): https://getdispatchrecordsbymarshal-w5bxtmmbsa-uc.a.run.app
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
Function URL (addPassengerCount(us-central1)): https://addpassengercount-w5bxtmmbsa-uc.a.run.app
Function URL (getPassengerCountByVehicle(us-central1)): https://getpassengercountbyvehicle-w5bxtmmbsa-uc.a.run.app
Function URL (getPassengerCountsByAssociation(us-central1)): https://getpassengercountsbyassociation-w5bxtmmbsa-uc.a.run.app
Function URL (getPassengerCountsByAmbassador(us-central1)): https://getpassengercountsbyambassador-w5bxtmmbsa-uc.a.run.app
Function URL (addVehicle(us-central1)): https://addvehicle-w5bxtmmbsa-uc.a.run.app
Function URL (getQRCode(us-central1)): https://getqrcode-w5bxtmmbsa-uc.a.run.app
Function URL (addVehicleHeartbeat(us-central1)): https://addvehicleheartbeat-w5bxtmmbsa-uc.a.run.app
Function URL (addVehiclePhoto(us-central1)): https://addvehiclephoto-w5bxtmmbsa-uc.a.run.app
Function URL (addVehicleVideo(us-central1)): https://addvehiclevideo-w5bxtmmbsa-uc.a.run.app
Function URL (addVehicleArrival(us-central1)): https://addvehiclearrival-w5bxtmmbsa-uc.a.run.app
Function URL (addVehicleDeparture(us-central1)): https://addvehicledeparture-w5bxtmmbsa-uc.a.run.app
Function URL (getVehiclePhotos(us-central1)): https://getvehiclephotos-w5bxtmmbsa-uc.a.run.app
Function URL (getVehicleVideos(us-central1)): https://getvehiclevideos-w5bxtmmbsa-uc.a.run.app
Function URL (getVehicleHeartbeats(us-central1)): https://getvehicleheartbeats-w5bxtmmbsa-uc.a.run.app
Function URL (getVehicleArrivals(us-central1)): https://getvehiclearrivals-w5bxtmmbsa-uc.a.run.app
Function URL (getVehicleDepartures(us-central1)): https://getvehicledepartures-w5bxtmmbsa-uc.a.run.app
Function URL (uploadFilesToCloudStorage(us-central1)): https://uploadfilestocloudstorage-w5bxtmmbsa-uc.a.run.app
Function URL (downloadCloudStorageFile(us-central1)): https://downloadcloudstoragefile-w5bxtmmbsa-uc.a.run.app
Function URL (downloadFileFromWeb(us-central1)): https://downloadfilefromweb-w5bxtmmbsa-uc.a.run.app
Function URL (getCountries(us-central1)): https://getcountries-w5bxtmmbsa-uc.a.run.app
Function URL (hiYebo(us-central1)): https://us-central1-kasie2024.cloudfunctions.net/hiYebo
Function URL (getQRCode(us-central1)): https://getqrcode-w5bxtmmbsa-uc.a.run.app 🅿️ 🅿️ 🅿️ 
🅿️ 🅿️ 🅿️ https://us-central1-kasie2024.cloudfunctions.net/getQRCode


functions[us-central1-addDispatchRecord]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/addDispatchRecord).
✔  functions[us-central1-getDispatchRecordsByVehicle]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/getDispatchRecordsByVehicle).
✔  functions[us-central1-getDispatchRecordsByAssociation]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/getDispatchRecordsByAssociation).
✔  functions[us-central1-getDispatchRecordsByMarshal]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/getDispatchRecordsByMarshal).
✔  functions[us-central1-registerAssociationUser]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/registerAssociationUser).
✔  functions[us-central1-registerAssociation]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/registerAssociation).
✔  functions[us-central1-addSettings]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/addSettings).
✔  functions[us-central1-getAssociations]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/getAssociations).
✔  functions[us-central1-getAssociationCars]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/getAssociationCars).
✔  functions[us-central1-addRoute]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/addRoute).
✔  functions[us-central1-addRoutePoints]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/addRoutePoints).
✔  functions[us-central1-addRouteLandmarks]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/addRouteLandmarks).
✔  functions[us-central1-getRoutePoints]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/getRoutePoints).
✔  functions[us-central1-getRouteLandmarks]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/getRouteLandmarks).
✔  functions[us-central1-getAssociationRoutes]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/getAssociationRoutes).
✔  functions[us-central1-getRoutes]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/getRoutes).
✔  functions[us-central1-getRoutesByLocation]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/getRoutesByLocation).
✔  functions[us-central1-addPassengerCount]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/addPassengerCount).
✔  functions[us-central1-getPassengerCountByVehicle]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/getPassengerCountByVehicle).
✔  functions[us-central1-getPassengerCountsByAssociation]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/getPassengerCountsByAssociation).
✔  functions[us-central1-getPassengerCountsByAmbassador]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/getPassengerCountsByAmbassador).
✔  functions[us-central1-addVehicle]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/addVehicle).
✔  functions[us-central1-getQRCode]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/getQRCode).
✔  functions[us-central1-addVehicleHeartbeat]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/addVehicleHeartbeat).
✔  functions[us-central1-addVehiclePhoto]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/addVehiclePhoto).
✔  functions[us-central1-addVehicleVideo]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/addVehicleVideo).
✔  functions[us-central1-addVehicleArrival]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/addVehicleArrival).
✔  functions[us-central1-addVehicleDeparture]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/addVehicleDeparture).
✔  functions[us-central1-updateVehicleQRCode]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/updateVehicleQRCode).
✔  functions[us-central1-getVehiclePhotos]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/getVehiclePhotos).
✔  functions[us-central1-getVehicleVideos]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/getVehicleVideos).
✔  functions[us-central1-getVehicleHeartbeats]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/getVehicleHeartbeats).
✔  functions[us-central1-getVehicleArrivals]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/getVehicleArrivals).
✔  functions[us-central1-getVehicleDepartures]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/getVehicleDepartures).
✔  functions[us-central1-uploadFilesToCloudStorage]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/uploadFilesToCloudStorage).
✔  functions[us-central1-downloadCloudStorageFile]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/downloadCloudStorageFile).
✔  functions[us-central1-downloadFileFromWeb]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/downloadFileFromWeb).
✔  functions[us-central1-addCommuter]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/addCommuter).
✔  functions[us-central1-addCommuterRequest]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/addCommuterRequest).
✔  functions[us-central1-addCommuterResponse]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/addCommuterResponse).
✔  functions[us-central1-getCountries]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/getCountries).
✔  functions[us-central1-hiYebo]: http function initialized (http://127.0.0.1:5001/kasie2024/us-central1/hiYebo).
*/
