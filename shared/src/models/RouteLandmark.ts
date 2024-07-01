import { Position } from './position';

export interface RouteLandmark {
  _partitionKey: string;

  _id: string;
 
  routeId: string;
 
  routePointId: string;
 
  index: number;
 
  routePointIndex: number;
 
  routeName: string;
 
  landmarkId: string;
 
  landmarkName: string;
 
  created: string;
 
  associationId: string;
 
  position: Position;
}

