import { TestBed, inject } from '@angular/core/testing';

import { PassDataReaderService } from './pass-data-reader.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PassDataReaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassDataReaderService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([PassDataReaderService], (service: PassDataReaderService) => {
    expect(service).toBeTruthy();
  }));
});
