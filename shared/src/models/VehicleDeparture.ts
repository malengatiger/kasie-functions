import { ObjectId } from 'mongodb';
import { Position } from './position';

export interface VehicleDeparture {
  _partitionKey: string;

  _id: ObjectId;
 
  vehicleDepartureId: string;
 
  landmarkId: string;
 
  landmarkName: string;
 
  ownerId: string;
 
  ownerName: string;
 
  vehicleId: string;
 
  associationId: string;
 
  associationName: string;
 
  vehicleReg: string;
 
  created: string;
 
  make: string;
 
  model: string;
 
  position: Position;
}
