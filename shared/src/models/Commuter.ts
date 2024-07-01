import { ObjectId } from "mongodb";

export interface Commuter {
  _partitionKey: string;

  _id: ObjectId;
 
  commuterId: string;
 
  cellphone?: string;
 
  email: string;
 
  name?: string;
 
  dateRegistered: string;
 
  qrCodeUrl?: string;
 
  profileUrl?: string;
 
  profileThumbnail?: string;
 
  countryId?: string;
 
  password?: string;
 
  gender?: string;
}

