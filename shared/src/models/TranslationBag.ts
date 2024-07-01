
export interface TranslationBag {
  _partitionKey: string;

  _id: string;
 
  stringToTranslate: string;
 
  translatedString: string;
 
  source: string;
 
  target: string;
 
  format: string;
 
  translatedText: string;
 
  key: string;
 
  created: string;
}

