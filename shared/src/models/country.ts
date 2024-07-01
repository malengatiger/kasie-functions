import { Position } from './position';

export interface Country {
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

