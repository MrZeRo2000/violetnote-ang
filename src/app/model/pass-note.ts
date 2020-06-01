import {PassCategory} from './pass-category';
import {UrlUtils} from '../utils/url-utils';

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
    if (UrlUtils.isValidURL(this.custom)) {
      return UrlUtils.ensureProtocol(this.custom);
    } else if (UrlUtils.isValidURL(this.comments)) {
      return UrlUtils.ensureProtocol(this.comments);
    } else {
      return undefined;
    }
  }
}
