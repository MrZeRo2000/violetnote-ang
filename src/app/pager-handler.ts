export class PagerHandler<T> {
  private pagedItems: Array<T>;
  private pageCount: number;
  private displayedItems: Array<T>;

  public getPageCount(): number {
    return this.pageCount;
  }

  public getDisplayedItems(): Array<T> {
    return this.displayedItems;
  }

  public getPagingInfo() {
    return {
      displayedItems: this.displayedItems,
      pageCount: this.pageCount
    };
  }

  public setPageItems(items: Array<T>): void {
    this.pagedItems = items;
    this.pageCount = Math.ceil(this.pagedItems.length / this.maxPageSize);
    if (this.pageCount === 1) {
      this.displayedItems = this.pagedItems;
    } else {
      this.displayedItems = this.pagedItems.slice(0, this.maxPageSize);
    }
  }

  public pageChanged(page: number, itemsPerPage: number): void {
    const startItem = (page - 1) * itemsPerPage;
    const endItem = page * itemsPerPage;
    this.displayedItems = this.pagedItems.slice(startItem, endItem);
  }

  constructor(private maxPageSize = 10) {}
}
