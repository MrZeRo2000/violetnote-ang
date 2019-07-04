import {ElementRef, Component, Input, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {PassDataService} from '../services/pass-data.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit  {
  @Input() inputSearch: string;
  @ViewChild('search', { static: true }) inputSearchElement: ElementRef;
  isValidSearch = true;
  isFocusRequired = false;
  searchStrings: string[];

  constructor(private router: Router, passDataService: PassDataService) {
    passDataService.currentPassData.subscribe(() => this.currentPassDataChanged());
    passDataService.currentSearchStrings.subscribe((searchStrings) => this.setSearchStrings(searchStrings))
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(e => {if ((e as NavigationEnd).url === '/main') {this.requireFocus(); }});
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

}
