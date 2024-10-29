import { TestBed } from '@angular/core/testing';

import { PassDataFileNameService } from './pass-data-file-name.service';
import {DataSourceModule} from '../data-source/data-source.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {AppConfigModule} from '../app-config/app-config.module';
import {AuthService} from './auth.service';
import {RestDataSourceService} from '../data-source/rest-data-source.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PassDataFileNameService', () => {
  let service: PassDataFileNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [DataSourceModule,
        AppConfigModule],
    providers: [
        AuthService,
        RestDataSourceService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(PassDataFileNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
