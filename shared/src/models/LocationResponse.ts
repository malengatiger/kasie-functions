import { Position } from './position';

export interface LocationResponse {
  _partitionKey: string;

  _id: string;

  associationId: string;

  vehicleId: string;

  vehicleReg: string;

  created: string;

  userId: string;

  userName: string;

  position: Position;
}

