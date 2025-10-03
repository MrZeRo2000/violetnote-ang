import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { passDataGuard } from './pass-data-guard';

describe('passDataGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => passDataGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
