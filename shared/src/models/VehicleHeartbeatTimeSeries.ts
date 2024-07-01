import { HeartbeatMeta } from './HeartbeatMeta';

export interface VehicleHeartbeatTimeSeries {
 
  timestamp: Date;
 
  metaData: HeartbeatMeta;
 
  associationId: string;
 
  vehicleId: string;
 
  count: number;
}

