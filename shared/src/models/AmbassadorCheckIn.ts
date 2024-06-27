import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './position';
import { HydratedDocument } from 'mongoose';

export type AmbassadorCheckInDocument = HydratedDocument<AmbassadorCheckIn>;
@Schema({
  timestamps: true,
  collection: 'AmbassadorCheckIn',
})
export class AmbassadorCheckIn {
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

export const AmbassadorCheckInSchema =
  SchemaFactory.createForClass(AmbassadorCheckIn);
