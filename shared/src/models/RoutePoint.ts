import { Position } from './position';


export interface RoutePoint {
  _partitionKey: string;
  _id: string;
 
  routePointId: string;
 
  latitude: number;
 
  longitude: number;
 
  heading: number;
 
  index: number;
 
  created: string;
 
  routeId: string;
 
  associationId: string;
 
  routeName: string;
 
  position: Position;
}

