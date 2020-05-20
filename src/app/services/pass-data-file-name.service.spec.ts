import { TestBed } from '@angular/core/testing';

import { PassDataFileNameService } from './pass-data-file-name.service';
import {DataSourceModule} from '../data-source/data-source.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AppConfigModule} from '../app-config/app-config.module';
import {AuthService} from './auth.service';
import {RestDataSourceService} from '../data-source/rest-data-source.service';

describe('PassDataFileNameService', () => {
  let service: PassDataFileNameService;

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
    service = TestBed.inject(PassDataFileNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
