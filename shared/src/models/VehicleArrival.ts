import { ObjectId } from 'mongodb';
import { Position } from './position';

export interface VehicleArrival {
  _partitionKey: string;

  _id: ObjectId;

  vehicleArrivalId: string;

  landmarkId: string;

  landmarkName: string;

  position: Position;

  created: string;

  vehicleId: string;

  associationId: string;

  associationName: string;

  vehicleReg: string;

  make: string;

  model: string;

  ownerId: string;

  ownerName: string;

  dispatched: boolean;
}

