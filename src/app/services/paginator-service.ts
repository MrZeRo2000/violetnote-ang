import { Injectable } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {
  private static readonly PAGE_SIZE_PARAMETER_NAME = 'defaultPageSize';
  private static readonly _pageSizeOptions = [5, 10, 25, 100]

  get pageSizeOptions(): number[] {
    return PaginatorService._pageSizeOptions;
  }

  private _pageSize = parseInt(localStorage.getItem(PaginatorService.PAGE_SIZE_PARAMETER_NAME) || '5')

  get pageSize(): number {
    return this._pageSize;
  }

  set pageSize(value: number) {
    this._pageSize = value;
    localStorage.setItem(PaginatorService.PAGE_SIZE_PARAMETER_NAME, value.toString())
  }

  setupPaginator(paginator: MatPaginator): void {
    if (paginator) {
      paginator.pageSizeOptions = this.pageSizeOptions
      paginator.pageSize = this.pageSize
      paginator.pageIndex = 0
    }
  }
}
