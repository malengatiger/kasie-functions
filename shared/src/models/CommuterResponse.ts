
export interface CommuterResponse {
 
  commuterResponseId: string;
 
  commuterRequestId: string;
 
  responseDate: string;
 
  message: string;
 
  routeId: string;
 
  routeName: string;
 
  numberOfVehiclesOnRoute: number;
 
  routeLandmarkId: string;
 
  routeLandmarkName: string;
 
  associationId: string;
 
  vehicleDispatched: boolean;
}

