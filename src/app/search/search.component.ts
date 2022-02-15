import {ElementRef, Component, Input, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {PassDataService} from '../services/pass-data.service';
import {BehaviorSubject, Subject, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {LastSearchService} from '../services/last-search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy  {
  @Input() inputSearch: string;
  @ViewChild('search', { static: true }) inputSearchElement: ElementRef;

  isValidSearch = true;
  isFocusRequired = false;
  searchStrings: string[];
  lastSearches: Array<string>;

  private passDataSubscription: Subscription;
  private searchStringsSubscription: Subscription;
  private routerEventsSubscription: Subscription;
  private lastSearchesSubscription: Subscription;

  constructor(private router: Router, private passDataService: PassDataService, private lastSearchService: LastSearchService) {
    this.passDataSubscription =
      passDataService.currentPassData.subscribe(() => this.currentPassDataChanged());
    this.searchStringsSubscription =
      passDataService.currentSearchStrings.subscribe((searchStrings) => this.setSearchStrings(searchStrings));
    this.routerEventsSubscription = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(e => {if ((e as NavigationEnd).url === '/main') {this.requireFocus(); }});
    this.lastSearchesSubscription = this.lastSearchService.currentLastSearches.subscribe(
      value => {
        this.lastSearches = value;
      }
    )
  }

  ngOnInit() {
  }

  private requireFocus(): void {
    if (this.inputSearchElement === null) {
      this.isFocusRequired = true;
    } else {
      this.inputSearchElement.nativeElement.focus();
    }
  }

  ngAfterViewInit(): void {
    if (this.isFocusRequired) {
      this.inputSearchElement.nativeElement.focus();
      this.isFocusRequired = false;
    }
  }

  ngOnDestroy(): void {
    this.passDataSubscription?.unsubscribe();
    this.searchStringsSubscription?.unsubscribe();
    this.routerEventsSubscription?.unsubscribe();
    this.lastSearchesSubscription?.unsubscribe();
  }

  private currentPassDataChanged() {
    this.isFocusRequired = true;
  }

  private setSearchStrings(searchStrings: Array<string>) {
    this.searchStrings = searchStrings;
  }

  private submitSearch() {
    if (this.checkValidSearch()) {
      this.router.navigate(['search', this.inputSearch]);
      this.inputSearch = '';
    }
  }

  onSearchKeyUp(event) {
    if (event.key === 'Enter') {
      this.submitSearch();
    } else {
      this.resetValidSearch();
    }
  }

  onSubmitSearch(event) {
    this.submitSearch();
  }

  checkValidSearch(): boolean {
    this.isValidSearch = !!this.inputSearch && this.inputSearch.length > 1;
    return this.isValidSearch;
  }

  resetValidSearch(): void {
    this.isValidSearch = true;
  }

  onLastSearchesClick(event, item) {
    event.preventDefault();
    this.router.navigate(['search', item]);
  }

  onClearHistoryClick(event) {
    event.preventDefault();
    this.lastSearchService.deleteSearches();
  }

}
