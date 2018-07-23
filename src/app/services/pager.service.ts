import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagerService {

  constructor() { }

  public getPagedInfo(items: Array<any>, pagingCount: number, pageNum: number, itemsPerPage: number) {
    const itemsLength = items.length;
    // const maxPageNum = itemsPerPage * pagingCount;
    const maxPageNum = Math.round(itemsLength / Math.ceil(itemsLength / itemsPerPage)) + 1;
    pagingCount = Math.min(maxPageNum, pagingCount);
    pageNum = Math.min(Math.max(pageNum, 1), maxPageNum);
    const startItemIndex = (pageNum - 1) * itemsPerPage;
    const endItemIndex = Math.min(startItemIndex + itemsPerPage, itemsLength);

    let startPageNum = Math.max(pageNum - Math.ceil(pagingCount / 2), 0) + 1;
    let endPageNum = startPageNum + Math.min(startPageNum + pagingCount, maxPageNum) - 1;
    if (endPageNum > maxPageNum) {
      endPageNum --;
      startPageNum --;
    }
    const pageNumbersLength = endPageNum - startPageNum + 1;

    const pageNumbers = Array.from({length: pageNumbersLength}, (v, k) => startPageNum + k);

    return {
      pagedItems: items.slice(startItemIndex, endItemIndex),
      pageNumbers: pageNumbers,
      maxPageNum: maxPageNum,
      pageNum: pageNum,
      startItemIndex: startItemIndex,
      endItemIndex: endItemIndex,
      startPageNum: startPageNum,
      endPageNum: endPageNum,
      pageNumbersLength: pageNumbersLength,
      itemsLength: itemsLength,
      pagingCount: pagingCount
    };
  }
}
