import {PagerStatus} from './model/pager-status';
import {BehaviorSubject, Subject} from 'rxjs';

export class PagerHandler<T> {
  private pagedItems: Array<T>;
  private pagerStatus: PagerStatus<T> = new PagerStatus<T>();

  pagerStatusSubject: BehaviorSubject<PagerStatus<T>> = new BehaviorSubject<PagerStatus<T>>(null);

  private pageAllMode = false;

  private getPageCount(): number {
    return Math.ceil(this.pagedItems.length / this.maxPageSize);
  }

  private getDisplayItems(page: number, itemsPerPage: number): Array<T> {
    const startItem = (page - 1) * itemsPerPage;
    const endItem = page * itemsPerPage;
    return this.pagedItems.slice(startItem, endItem);
  }

  public setPageItems(items: Array<T>): void {
    this.pageAllMode = false;
    this.pagedItems = items;
    this.pagerStatus.pageCount = this.getPageCount();
    if (this.pagerStatus.pageCount === 1) {
      this.pagerStatus.displayedItems = this.pagedItems;
    } else {
      this.pagerStatus.displayedItems = this.pagedItems.slice(0, this.maxPageSize);
    }
    this.pagerStatus.totalCount = items.length;
    this.pagerStatus.currentPage = 1;
    this.pagerStatusSubject.next(this.pagerStatus);
  }

  public updatePageItems(items: Array<T>, itemsPerPage: number): void {
    // update items info
    this.pagedItems = items;

    if (this.pageAllMode) {
      this.pageAll();
    } else {
      // save page counts
      const pageCount = this.getPageCount();
      const currentPage = this.pagerStatus.currentPage;

      const page = currentPage > 0 && currentPage <= pageCount ? currentPage : pageCount;

      // update to current page count
      this.pagerStatus.pageCount = this.getPageCount();

      // update page status
      this.pagerStatus.totalCount = items.length;
      this.pagerStatus.currentPage = page;

      this.pageChanged(page, itemsPerPage);
    }
  }

  public pageChanged(page: number, itemsPerPage: number): void {
    this.pagerStatus.displayedItems = this.getDisplayItems(page, itemsPerPage);
    this.pagerStatusSubject.next(this.pagerStatus);
  }

  public pageAll(): void {
    this.pageAllMode = true;
    this.pagerStatus.displayedItems = this.pagedItems;
    this.pagerStatus.pageCount = 1;
    this.pagerStatus.currentPage = 1;
    this.pagerStatusSubject.next(this.pagerStatus);
  }

  constructor(private maxPageSize) {}
}
