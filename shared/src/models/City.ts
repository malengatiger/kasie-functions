import { Position } from './position';

export interface City {
  _partitionKey: string;

  _id: string;
 
  name: string;
 
  cityId: string;
 
  country: string;
 
  countryId: string;
 
  stateId: string;
 
  stateName: string;
 
  countryName: string;
 
  province: string;
 
  position: Position;
 
  latitude: number;
 
  longitude: number;
}

