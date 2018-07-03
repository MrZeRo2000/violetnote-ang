import { TestBed, inject } from '@angular/core/testing';

import { PassDataReaderService } from './pass-data-reader.service';

describe('PassDataReaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassDataReaderService]
    });
  });

  it('should be created', inject([PassDataReaderService], (service: PassDataReaderService) => {
    expect(service).toBeTruthy();
  }));
});
