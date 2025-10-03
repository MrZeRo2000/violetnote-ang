import { TestBed } from '@angular/core/testing';

import { PassDataSelectionService } from './pass-data-selection-service';

describe('PassDataSelectionService', () => {
  let service: PassDataSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassDataSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
