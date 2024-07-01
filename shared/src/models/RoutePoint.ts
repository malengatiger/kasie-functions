import { ObjectId } from 'mongodb';
import { Position } from './position';


export interface RoutePoint {
  _partitionKey: string;
  _id: ObjectId;
 
  routePointId: string;
 
  heading?: number;
 
  index: number;
 
  created: string;
 
  routeId: string;
 
  associationId: string;
 
  routeName?: string;
 
  position: Position;
}

