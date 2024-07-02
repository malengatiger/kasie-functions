import { ObjectId } from "mongodb";

export interface AssociationToken {
  _partitionKey: string;

  _id: ObjectId;
 
  userId: string;
 
  token: string;
 
  created: string;
 
  associationId: string;
 
  associationName: string;
}

