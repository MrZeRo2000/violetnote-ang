import {PassCategory} from './pass-category';
import {UtilityService} from '../services/utility.service';

export class PassNote {
  passCategory: PassCategory;
  system: string;
  user: string;
  password: string;
  comments: string;
  custom: string;
  info: string;
  public getURL(): string {
    if (UtilityService.isValidURL(this.custom)) {
      return UtilityService.ensureProtocol(this.custom);
    } else if (UtilityService.isValidURL(this.comments)) {
      return UtilityService.ensureProtocol(this.comments);
    } else {
      return undefined;
    }
  }
}
