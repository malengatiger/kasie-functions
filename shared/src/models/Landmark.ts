import { Position } from './position';

export interface Landmark {
  _partitionKey: string;

  _id: string;
 
  landmarkId: string;
 
  associationId: string;
 
  created: string;
 
  latitude: number;
 
  longitude: number;
 
  distance: number;
 
  landmarkName: string;
 
  routeDetails: [];
 
  position: Position;
}

