import { Position } from './position';

export interface VehiclePhoto {
  _partitionKey: string;

  _id: string;
 
  vehicleId: string;
 
  vehicleReg: string;
 
  associationId: string;
 
  userName: string;
 
  created: string;
 
  vehiclePhotoId: string;
 
  landmarkName: string;
 
  userId: string;
 
  url: string;
 
  thumbNailUrl: string;
 
  landmarkId: string;
 
  position: Position;
}

