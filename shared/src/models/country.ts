import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './position';
@Schema({
  timestamps: true,
  collection: 'Country',
})
export class Country {
  _partitionKey: string;
  _id: string;
  
  countryId: string;
  
  name: string;
  
  iso3: string;
  
  iso2: string;
  
  phoneCode: string;
  
  capital: string;
  
  currency: string;
  
  currencyName: string;
  
  currencySymbol: string;
  
  tld: string;
  
  region: string;
  
  subregion: string;
  
  timezones: [];
  
  latitude: number;
  
  longitude: number;
  
  emoji: string;
  
  emojiU: string;

  description: string;
  
  position: Position;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
