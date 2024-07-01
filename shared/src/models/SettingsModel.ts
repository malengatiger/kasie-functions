
export interface SettingsModel {
  _partitionKey: string;
  _id: string;
  //
 
  associationId: string;
 
  locale: string;
 
  refreshRateInSeconds: number;
 
  themeIndex: number;
 
  geofenceRadius: number;
 
  commuterGeofenceRadius: number;
 
  vehicleSearchMinutes: number;
 
  heartbeatIntervalSeconds: number;
 
  loiteringDelay: number;
 
  commuterSearchMinutes: number;
 
  commuterGeoQueryRadius: number;
 
  vehicleGeoQueryRadius: number;
 
  numberOfLandmarksToScan: number;
 
  distanceFilter: number;
 
  created: string;
}

