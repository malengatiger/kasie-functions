import { Position } from './position';

export interface VehicleHeartbeat {
  _partitionKey: string;

  _id: string;
 
  vehicleHeartbeatId: string;
 
  vehicleId: string;
 
  vehicleReg: string;
 
  associationId: string;
 
  ownerId: string;
 
  ownerName: string;
 
  position: Position;
 
  created: string;
 
  longDate: number;
 
  make: string;
 
  model: string;
 
  appToBackground: boolean;
}

