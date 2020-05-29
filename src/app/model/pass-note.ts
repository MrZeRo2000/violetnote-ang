import {PassCategory} from './pass-category';
import {UtilityService} from '../services/utility.service';

export class PassNote {
  constructor(
    public passCategory: PassCategory,
    public system: string,
    public user: string,
    public password: string,
    public comments: string,
    public custom: string,
    public info: string
  ) {  }
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
