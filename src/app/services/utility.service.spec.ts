import { TestBed } from '@angular/core/testing';

import { UtilityService } from './utility.service';

describe('UtilityService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('valid http url', () => {
    expect(UtilityService.isValidURL('http://www.cyfral.net.ua/')).toBeTruthy();
  });

  it('valid url without http 1', () => {
    expect(UtilityService.isValidURL('energy.kyivgaz.ua')).toBeTruthy();
  });

  it('valid url without http 2', () => {
    expect(UtilityService.isValidURL('tickets.ua')).toBeTruthy();
  });

  it('invalid url several words', () => {
    expect(UtilityService.isValidURL('something is wrong')).toBeFalsy();
  });

  /*
  it('invalid url one word', () => {
    expect(service.isValidURL('something')).toBeFalsy();
  });
  */

  it('email', () => {
    expect(UtilityService.isValidURL('something@outlook.com')).toBeFalsy();
  });
});
