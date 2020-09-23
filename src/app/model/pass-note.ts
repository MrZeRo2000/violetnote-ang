import {UrlUtils} from '../utils/url-utils';

export class PassNote {
  constructor(
    public system: string,
    public user: string,
    public password: string,
    public url: string,
    public info: string
  ) {  }
  public getURL(): string {
    if (UrlUtils.isValidURL(this.url)) {
      return UrlUtils.ensureProtocol(this.url);
    } else {
      return undefined;
    }
  }
}
