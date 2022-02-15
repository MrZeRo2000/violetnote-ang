import { TestBed } from '@angular/core/testing';

import { LastSearchService } from './last-search.service';
import {J} from '@angular/cdk/keycodes';

describe('LastSearchService', () => {
  let service: LastSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LastSearchService);
    service.deleteSearches();
  });

  afterAll(() => {
    service.deleteSearches();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('add one', () => {
    service.addSearchValue("1");
    expect(service.getSearches()).toEqual(["1"]);
  });

  it('add two', () => {
    service.addSearchValue("1");
    service.addSearchValue("2");
    expect(service.getSearches()).toEqual(["2", "1"]);
  });

  it('add two and second to top', () => {
    service.addSearchValue("1");
    service.addSearchValue("2");
    service.addSearchValue("1");
    expect(service.getSearches()).toEqual(["1", "2"]);
  });

  it('add four and last to top', () => {
    service.addSearchValue("1");
    service.addSearchValue("2");
    service.addSearchValue("3");
    service.addSearchValue("4");
    service.addSearchValue("1");
    expect(service.getSearches()).toEqual(["1", "4", "3", "2"]);
  });

  it('add more than 10', () => {
    for (let i = 1; i < 20; i++) {
      service.addSearchValue(i.toString(10));
    }
    expect(service.getSearches().length).toEqual(10);
    console.log(JSON.stringify(service.getSearches()));
  });
});
