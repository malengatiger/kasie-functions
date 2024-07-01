import { Position } from './position';

export interface DispatchRecord {
  dispatchRecordId: string,
  routeLandmarkId: string,
  marshalId: string,
  passengers: Number,
  ownerId: string,
  created: string,
  position: Position,
  dispatched: boolean,
  landmarkName: string,
  marshalName: string,
  routeId: string,
  vehicleId: string,
  vehicleArrivalId: string,
  vehicleReg: string,
  associationId: string,
  associationName: string,
  
};

