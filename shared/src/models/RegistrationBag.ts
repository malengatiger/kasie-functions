import { Association } from './Association';
import { Country } from './country';
import { SettingsModel } from './SettingsModel';
import { User } from './User';

export interface RegistrationBag {
  association: Association;
  user: User;
  settings: SettingsModel;
  country: Country;
}
