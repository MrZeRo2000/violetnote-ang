import { TestBed, async, inject } from '@angular/core/testing';

import { PassDataRequiredGuard } from './pass-data-required.guard';
import {RouterTestingModule} from '@angular/router/testing';

describe('PassDataRequiredGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassDataRequiredGuard],
      imports: [
        RouterTestingModule
      ]
    });
  });

  it('should ...', inject([PassDataRequiredGuard], (guard: PassDataRequiredGuard) => {
    expect(guard).toBeTruthy();
  }));
});
