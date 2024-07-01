
export interface CalculatedDistance {
  _partitionKey: string;

  _id: string;
 
  routeName: string;
 
  routeId: string;
 
  fromLandmark: string;
 
  toLandmark: string;
 
  fromLandmarkId: string;
 
  toLandmarkId: string;
 
  index: number;
 
  distanceInMetres: number;
 
  distanceFromStart: number;
 
  fromRoutePointIndex: number;
 
  toRoutePointIndex: number;
}

