import { TestBed, inject } from '@angular/core/testing';

import { PagerService } from './pager.service';
import {print} from 'util';
import {computeStyle} from '@angular/animations/browser/src/util';
import {range} from 'rxjs';

const testPagerList = [];
for (let i = 0; i < 30; i++) {
  testPagerList.push({name: `Name ${i}`});
}

const numList = Array.from({length: 30}, (v, k) => k + 1);


// numList.forEach((i) => {testPagerList.push({name: `Name ${i}`}); });

const testPagerList4 = [];
for (let i = 0; i < 4; i++) {
  testPagerList4.push({name: `Name ${i}`});
}

const testPagerList7 = [];
for (let i = 0; i < 7; i++) {
  testPagerList7.push({name: `Name ${i}`});
}

describe('PagerServiceUnit', () => {
  let service: PagerService;
  beforeEach(() => service = new PagerService());

  it('Test item list', () => {
    expect(testPagerList.length).toBe(30);
  });

  it('One page items', () => {
    expect(service.getPagedInfo(testPagerList, 1, 1, 100).pagedItems.length).toBe(30);
  });

  it('Page 1 item 1', () => {
    expect(service.getPagedInfo(testPagerList, 5, 1, 5).pagedItems[0].name).toBe('Name 0');
  });

  it('Page 1 item 5', () => {
    expect(service.getPagedInfo(testPagerList, 5, 1, 5).pagedItems[4].name).toBe('Name 4');
  });

  it('Page 2 item 1', () => {
    expect(service.getPagedInfo(testPagerList, 5, 2, 5).pagedItems[0].name).toBe('Name 5');
  });

  it('Last item test', () => {
    expect(service.getPagedInfo(testPagerList4, 5, 2, 3).pagedItems.length).toBe(1);
  });


  const testService = new PagerService();
  const page1Items = testService.getPagedInfo(testPagerList, 5, 1, 3);
  console.log('Page 1 items');
  console.log(page1Items);

  let page4Items = testService.getPagedInfo(testPagerList4, 5, 1, 3);
  console.log('Page 4 items page 1');
  console.log(page4Items);

  page4Items = testService.getPagedInfo(testPagerList4, 5, 2, 3);
  console.log('Page 4 items page 2');
  console.log(page4Items);

  let page7Items = testService.getPagedInfo(testPagerList7, 5, 1, 3);
  console.log('Page 7 items page 1');
  console.log(page7Items);

  page7Items = testService.getPagedInfo(testPagerList7, 5, 2, 3);
  console.log('Page 7 items page 2');
  console.log(page7Items);

  page7Items = testService.getPagedInfo(testPagerList7, 5, 3, 3);
  console.log('Page 7 items page 3');
  console.log(page7Items);

});

describe('PagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PagerService]
    });
  });

  it('should be created', inject([PagerService], (service: PagerService) => {
    expect(service).toBeTruthy();
  }));
});
