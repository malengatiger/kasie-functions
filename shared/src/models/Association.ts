import { Position } from './position';

export interface Association {
  _partitionKey: string;
  _id: string;

 
  associationId: string;
 
  cityId: string;
 
  countryId: string;
 
  associationName: string;
 
  active: number;
 
  countryName: string;
 
  cityName: string;
 
  dateRegistered: string;
 
  position: Position;
 
  adminUserFirstName: string;
 
  adminUserLastName: string;
 
  userId: string;
 
  adminCellphone: string;
 
  adminEmail: string;
}

