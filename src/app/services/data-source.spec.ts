import { TestBed } from '@angular/core/testing';

import { DataSource } from './data-source';

describe('DataSource', () => {
  let service: DataSource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
