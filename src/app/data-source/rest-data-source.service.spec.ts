import { TestBed } from '@angular/core/testing';

import { RestDataSourceService } from './rest-data-source.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RestUrl} from '../app-config/app-config.service';
import {AppConfigModule} from '../app-config/app-config.module';

describe('RestDataSourceService', () => {
  let service: RestDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AppConfigModule
      ],
      providers: [
      ]
    });
    service = TestBed.inject(RestDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
