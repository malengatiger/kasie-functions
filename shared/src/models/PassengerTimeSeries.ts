import { HeartbeatMeta } from './HeartbeatMeta';


export interface PassengerTimeSeries {
  // Use the type option with Date type
  timestamp: Date;

 
  metaData: HeartbeatMeta;

 
  associationId: string;

 
  vehicleId: string;

 
  routeId: string;

 
  passengers: number;
}

