import { TestBed } from '@angular/core/testing';

import { PassDataFileInfoService } from './pass-data-file-info.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PassDataFileInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [PassDataFileInfoService],
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: PassDataFileInfoService = TestBed.inject(PassDataFileInfoService);
    expect(service).toBeTruthy();
  });
});
