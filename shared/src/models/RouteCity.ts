import { Position } from './position';

export interface RouteCity {
  _partitionKey: string;

  _id: string;

  routeId: string;

  routeName: string;

  cityId: string;

  cityName: string;

  created: string;

  associationId: string;

  routeLandmarkId: string;

  routeLandmarkName: string;

  position: Position;
}

