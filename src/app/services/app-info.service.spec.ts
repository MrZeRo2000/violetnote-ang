import { TestBed } from '@angular/core/testing';

import { AppInfoService } from './app-info.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DataSourceModule} from '../data-source/data-source.module';
import {AppConfigModule} from '../app-config/app-config.module';
import {AuthService} from './auth.service';
import {RestDataSourceService} from '../data-source/rest-data-source.service';

describe('AppInfoService', () => {
  let service: AppInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        DataSourceModule,
        AppConfigModule
      ],
      providers: [
        AuthService,
        RestDataSourceService
      ]
    });
    service = TestBed.inject(AppInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
