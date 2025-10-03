import { TestBed } from '@angular/core/testing';

import { PassDataFileService } from './pass-data-file-service';

describe('PassDataFileService', () => {
  let service: PassDataFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassDataFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
