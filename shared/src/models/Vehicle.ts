import { ObjectId } from "mongodb";

/* eslint-disable @typescript-eslint/no-unused-vars */
export interface Vehicle {
  _partitionKey: string;

  _id: ObjectId;
 
  ownerId?: string;
  
  vehicleId: string;
 
  associationId: string;
 
  countryId: string;
 
  ownerName: string;
 
  associationName: string;
 
  vehicleReg: string;
 
  model: string;
 
  make: string;
 
  year: string;
 
  passengerCapacity: number;
 
  active: number;
 
  created: string;
 
  updated: string;
 
  dateInstalled: string;
 
  qrCodeUrl: string;
}

