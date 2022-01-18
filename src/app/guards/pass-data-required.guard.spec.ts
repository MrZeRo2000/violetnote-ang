import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { PassDataRequiredGuard } from './pass-data-required.guard';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DataSourceModule} from '../data-source/data-source.module';
import {AppConfigModule} from '../app-config/app-config.module';

describe('PassDataRequiredGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassDataRequiredGuard],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        DataSourceModule,
        AppConfigModule
      ]
    });
  });

  it('should ...', inject([PassDataRequiredGuard], (guard: PassDataRequiredGuard) => {
    expect(guard).toBeTruthy();
  }));
});
