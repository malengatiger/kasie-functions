import { Position } from './position';

export interface VehicleDeparture {
  _partitionKey: string;

  _id: string;
 
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
