import { TestBed } from '@angular/core/testing';

import { AppConfigService } from './app-config.service';

describe('AppLoadService', () => {
  let service: AppConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
