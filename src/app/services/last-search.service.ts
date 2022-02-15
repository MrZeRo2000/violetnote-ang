import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LastSearchService {
  private static readonly LOCAL_STORAGE_LAST_SEARCH_KEY = 'lastSearch';
  private static readonly SEARCH_COUNT = 10;

  private lastSearches: Array<string> = [];

  private loadSearches(): void {
    this.lastSearches = JSON.parse(localStorage.getItem(LastSearchService.LOCAL_STORAGE_LAST_SEARCH_KEY)) || [];
  }

  private saveSearches(): void {
    if (this.lastSearches.length === 0) {
      this.deleteSearches();
    } else {
      localStorage.setItem(LastSearchService.LOCAL_STORAGE_LAST_SEARCH_KEY, JSON.stringify(this.lastSearches));
    }
  }

  public deleteSearches(): void {
    this.lastSearches = [];
    localStorage.removeItem(LastSearchService.LOCAL_STORAGE_LAST_SEARCH_KEY);
  }

  public getSearches(): Array<string> {
    return this.lastSearches;
  }

  public addSearchValue(value: string): void {
    const index = this.lastSearches.indexOf(value);

    // remove existing
    if (index > -1) {
      this.lastSearches.splice(index, 1);
    }

    // set to first
    this.lastSearches.splice(0, 0, value);

    // limit to search_count
    const len = this.lastSearches.length;
    if (len > LastSearchService.SEARCH_COUNT) {
      this.lastSearches.splice(LastSearchService.SEARCH_COUNT, len - LastSearchService.SEARCH_COUNT);
    }

    this.saveSearches();
  }

  constructor() {
    this.loadSearches();
  }


}
