
export interface RouteAssignment {
  _partitionKey: string;
  _id: string;

  associationId: string;

  routeId: string;

  vehicleId: string;

  active: number;

  created: string;

  routeName: string;

  associationName: string;

  vehicleReg: string;
}
