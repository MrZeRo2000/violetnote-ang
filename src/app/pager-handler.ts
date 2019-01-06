import {PagerStatus} from './model/pager-status';
import {BehaviorSubject, Subject} from 'rxjs';

export class PagerHandler<T> {
  private pagedItems: Array<T>;
  private pagerStatus: PagerStatus<T> = new PagerStatus<T>();

  pagerStatusSubject: Subject<PagerStatus<T>> = new BehaviorSubject<PagerStatus<T>>(null);

  public setPageItems(items: Array<T>): void {
    this.pagedItems = items;
    this.pagerStatus.pageCount = Math.ceil(this.pagedItems.length / this.maxPageSize);
    if (this.pagerStatus.pageCount === 1) {
      this.pagerStatus.displayedItems = this.pagedItems;
    } else {
      this.pagerStatus.displayedItems = this.pagedItems.slice(0, this.maxPageSize);
    }
    this.pagerStatus.totalCount = items.length;
    this.pagerStatus.currentPage = 1;
    this.pagerStatusSubject.next(this.pagerStatus);
  }

  public pageChanged(page: number, itemsPerPage: number): void {
    const startItem = (page - 1) * itemsPerPage;
    const endItem = page * itemsPerPage;
    this.pagerStatus.displayedItems = this.pagedItems.slice(startItem, endItem);
    this.pagerStatusSubject.next(this.pagerStatus);
  }

  public pageAll(): void {
    this.pagerStatus.displayedItems = this.pagedItems;
    this.pagerStatus.pageCount = 1;
    this.pagerStatus.currentPage = 1;
    this.pagerStatusSubject.next(this.pagerStatus);
  }

  constructor(private maxPageSize) {}
}
