import { Position } from './position';

export interface AppError {
 
  appErrorId: string;
 
  associationId: string;
 
  errorMessage: string;
 
  manufacturer: string;
 
  model: string;
 
  created: string;
 
  brand: string;
 
  userId: string;

 
  userName: string;
 
  errorPosition: Position;
 
  iosName: string;
 
  versionCodeName: string;
 
  baseOS: string;
 
  deviceType: string;
 
  iosSystemName: string;
 
  userUrl: string;
 
  uploadedDate: string;
 
  vehicleId: string;
 
  vehicleReg: string;
}

