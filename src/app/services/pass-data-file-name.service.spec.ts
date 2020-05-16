import { TestBed } from '@angular/core/testing';

import { PassDataFileNameService } from './pass-data-file-name.service';

describe('PassDataFileNameService', () => {
  let service: PassDataFileNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassDataFileNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
