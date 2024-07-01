import { Position } from './position';

export interface UserGeofenceEvent {
  _partitionKey: string;

  _id: string;

  userGeofenceId: string;

  landmarkId: string;

  activityType: string;

  action: string;

  userId: string;

  longDate: number;

  created: string;

  landmarkName: string;

  confidence: number;

  odometer: number;

  moving: boolean;

  associationId: string;

  position: Position;
}

