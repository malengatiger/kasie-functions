import { Position } from './position';

export interface RouteStartEnd {
  startCityPosition: Position;
  endCityPosition: Position;
  startCityId: string;
  startCityName: string;
  endCityId: string;
  endCityName: string;
}
