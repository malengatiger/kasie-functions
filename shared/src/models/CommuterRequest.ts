import { ObjectId } from 'mongodb';
import { Position } from './position';

export interface CommuterRequest {
  _partitionKey: string;

  _id: ObjectId;
 
  commuterRequestId: string;
 
  commuterId: string;
 
  dateRequested: string;
 
  dateNeeded: string;
 
  currentPosition: Position;
 
  routeId: string;
 
  routeName: string;
 
  routeLandmarkId: string;
 
  routeLandmarkName: string;
 
  routePointIndex: number;
 
  numberOfPassengers: number;
 
  distanceToRouteLandmarkInMetres: number;
 
  distanceToRoutePointInMetres: number;
 
  associationId: string;
 
  scanned: boolean;
 
  destinationCityId: string;
 
  destinationCityName: string;
 
  originCityId: string;
 
  originCityName: string;
}

