import { ObjectId } from 'mongodb';
import { Position } from './position';

export interface Association {
  _partitionKey: string;
  _id: ObjectId;

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

  adminPassword: string;
}

