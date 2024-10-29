import { TestBed, inject } from '@angular/core/testing';

import { PassDataRequiredGuard } from './pass-data-required.guard';
import {RouterTestingModule} from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {DataSourceModule} from '../data-source/data-source.module';
import {AppConfigModule} from '../app-config/app-config.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PassDataRequiredGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        DataSourceModule,
        AppConfigModule],
    providers: [PassDataRequiredGuard, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
  });

  it('should ...', inject([PassDataRequiredGuard], (guard: PassDataRequiredGuard) => {
    expect(guard).toBeTruthy();
  }));
});
