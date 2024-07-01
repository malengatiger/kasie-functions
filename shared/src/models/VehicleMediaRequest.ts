
export interface VehicleMediaRequest {
  _partitionKey: string;

  _id: string;
 
  userId: string;
 
  vehicleId: string;
 
  vehicleReg: string;
 
  created: string;
 
  requesterId: string;
 
  associationId: string;
 
  requesterName: string;
 
  addVideo: boolean;
}
