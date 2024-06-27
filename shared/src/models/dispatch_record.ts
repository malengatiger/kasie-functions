import { model, Schema } from 'mongoose';
import { Position } from './position';

const dispatchRecordSchema = new Schema({
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
  
});

const DispatchRecord = model("DispatchRecord", dispatchRecordSchema);
export default DispatchRecord;