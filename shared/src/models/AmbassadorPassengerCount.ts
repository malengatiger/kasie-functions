import { Position } from './position';
export interface AmbassadorPassengerCount {
 
  _partitionKey: string;
 
  _id: string;
 
  associationId: string;
 
  vehicleId: string;
 
  vehicleReg: string;
 
  created: string;
 
  userId: string;
 
  userName: string;
 
  routeId: string;
 
  routeName: string;
 
  routeLandmarkId: string;
 
  routeLandmarkName: string;
 
  ownerId: string;
 
  ownerName: string;
 
  passengerCountId: string;
 
  passengersIn: number;
 
  passengersOut: number;
 
  currentPassengers: number;
 
  position: Position;
}
