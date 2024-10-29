import { TestBed } from '@angular/core/testing';

import { RestDataSourceService } from './rest-data-source.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {AppConfigModule} from '../app-config/app-config.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('RestDataSourceService', () => {
  let service: RestDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [AppConfigModule],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(RestDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
