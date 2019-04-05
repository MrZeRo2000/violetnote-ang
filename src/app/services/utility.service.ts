import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  public static isValidURL(url: string) {
    const pattern = new RegExp('^((http|https)?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(url) && !(url === null) && !(url === undefined);
  }

  public static urlContainsProtocol(url: string) {
    const pattern = new RegExp('^((http|https):\\/\\/)', 'i');
    return !!pattern.test(url) && !(url === null) && !(url === undefined);
  }

  public static ensureProtocol(url: string): string {
    if (!UtilityService.urlContainsProtocol(url)) {
      return 'http://' + url;
    } else {
      return url;
    }
  }
}
