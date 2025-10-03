import {inject, Injectable, OnDestroy} from '@angular/core';
import {PassDataService} from './pass-data-service';
import {BehaviorSubject, map, Observable, of, Subscription, tap} from 'rxjs';
import {PassData, PassDataSearchResult} from '../models/pass-data';

@Injectable({
  providedIn: 'root'
})
export class PassDataSearchService implements OnDestroy {
  private passDataService = inject(PassDataService);
  private passDataServiceSubscription: Subscription

  private passData: PassData | null = null;

  searchValueSublect = new BehaviorSubject<string | null>(null);
  searchValueAction$ = this.searchValueSublect.asObservable().pipe(
    map(v => v && v.length > 1 ? v : null),
    tap(v => this.search(v))
  )

  private searchResultSubject = new BehaviorSubject<Array<PassDataSearchResult> | null>(null);
  searchResultAction$ = this.searchResultSubject.asObservable().pipe(
    tap(v => {
      console.debug(`Emitted search result: ${JSON.stringify(v)}`);
    })
  );

  constructor() {
    this.passDataServiceSubscription = this.passDataService.getPassData().subscribe(v => {
      this.passData = v
    })
  }

  ngOnDestroy(): void {
    this.passDataServiceSubscription?.unsubscribe()
  }

  public searchStrings(searchString: string): Observable<Array<string>> {
    const searchExp = new RegExp(`.*${searchString}.*`, 'i');
    if (!this.passData) {
      return of([]);
    } else {
      const foundItems = this.passData.categoryList
        .flatMap(v => v.noteList)
        .flatMap(v => [v.system, v.user])
        .filter(v => searchExp.test(v))

      return of(Array.from(new Set(foundItems)).sort());
    }
  }

  public search(searchString: string | null): void {
    console.log(`Searching ${searchString}`);
    if (!searchString || !this.passData) {
      this.searchResultSubject.next(null);
    } else {
      const searchExp = new RegExp(`.*${searchString}.*`, 'i');
      const foundItems = this.passData.categoryList
        .flatMap(v => v.noteList.flatMap(v1 => {
          return {categoryName: v.categoryName, passNote: v1} as PassDataSearchResult
        }))
        .filter(v => searchExp.test(v.passNote.system) || searchExp.test(v.passNote.user))
      this.searchResultSubject.next(foundItems);
      console.log('Pushed something to search result');
    }
  }
}
