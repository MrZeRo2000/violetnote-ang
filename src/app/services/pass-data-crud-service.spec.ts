import { TestBed } from '@angular/core/testing';

import { PassDataCRUDService } from './pass-data-crud-service';

describe('PassDataCrudService', () => {
  let service: PassDataCRUDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassDataCRUDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
