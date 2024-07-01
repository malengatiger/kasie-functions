import { Position } from './position';

export interface DispatchRecord {
  dispatchRecordId: String,
  slug: String,
  routeLandmarkId: String,
  marshalId: String,
  passengers: Number,
  ownerId: String,
  created: String,
  position: Position,
  dispatched: Boolean,
  landmarkName: String,
  marshalName: String,
  routeId: String,
  vehicleId: String,
  vehicleArrivalId: String,
  vehicleReg: String,
  associationId: String,
  associationName: String,
  
};

