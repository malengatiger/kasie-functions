import { ObjectId } from 'mongodb';
import { RouteStartEnd } from './RouteStartEnd';

export interface Route {
  _partitionKey: string;

  _id: ObjectId;

  routeId: string;

  countryId: string;

  countryName: string;

  name: string;

  routeNumber: string;

  created: string;

  updated: string;

  color: string;

  userId: string;

  userName: string;

  active: number;

  activationDate: string;

  associationId: string;

  associationName: string;

  qrCodeUrl: string;

  routeStartEnd: RouteStartEnd;

  calculatedDistances: [];

  heading: number;

  lengthInMetres: number;
}

