import { TestBed } from '@angular/core/testing';

import { PassDataSearchService } from './pass-data-search-service';

describe('PassDataSearchService', () => {
  let service: PassDataSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassDataSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
