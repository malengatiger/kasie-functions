import { ObjectId } from 'mongodb';
import { Position } from './position';

export interface VehicleVideo {
  _partitionKey: string,

  _id: ObjectId,
 
  vehicleId: string,
 
  vehicleReg: string,
 
  associationId: string,
 
  userName: string,
 
  created: string,
 
  vehicleVideoId: string,
 
  landmarkName: string,
 
  userId: string,
 
  url: string,
 
  thumbNailUrl: string,
 
  landmarkId: string,
 
  position: Position;
}

