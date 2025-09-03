import { TestBed } from '@angular/core/testing';

import { PassDataCrudService } from './pass-data-crud-service';

describe('PassDataCrudService', () => {
  let service: PassDataCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassDataCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
