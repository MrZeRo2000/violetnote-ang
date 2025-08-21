import { TestBed } from '@angular/core/testing';

import { UrlUtils } from './url-utils';

describe('UtilityService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('valid http url', () => {
    expect(UrlUtils.isValidURL('http://www.cyfral.net.ua/')).toBeTruthy();
  });

  it('valid url without http 1', () => {
    expect(UrlUtils.isValidURL('energy.kyivgaz.ua')).toBeTruthy();
  });

  it('valid url without http 2', () => {
    expect(UrlUtils.isValidURL('tickets.ua')).toBeTruthy();
  });

  it('invalid url several words', () => {
    expect(UrlUtils.isValidURL('something is wrong')).toBeFalsy();
  });

  /*
  it('invalid url one word', () => {
    expect(service.isValidURL('something')).toBeFalsy();
  });
  */

  it('email', () => {
    expect(UrlUtils.isValidURL('something@outlook.com')).toBeFalsy();
  });

  it('null', () => {
    expect(UrlUtils.isValidURL(null)).toBeFalsy();
  });

  it('undefined', () => {
    expect(UrlUtils.isValidURL(undefined)).toBeFalsy();
  });

  it('empty', () => {
    expect(UrlUtils.isValidURL('')).toBeFalsy();
  });

  it('contains protocol', () => {
    expect(UrlUtils.urlContainsProtocol('http://www.cyfral.net.ua/')).toBeTruthy();
  });

  it('does not contain protocol', () => {
    expect(UrlUtils.urlContainsProtocol('tickets.ua')).toBeFalsy();
  });
});
