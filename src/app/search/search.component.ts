import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() inputSearch: string;
  isValidSearch = true;

  constructor(private router: Router) { }

  ngOnInit() {
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
    } else if (!this.isValidSearch) {
      this.checkValidSearch();
    }
  }

  onSubmitSearch(event) {
    this.submitSearch();
  }

  checkValidSearch(): boolean {
    this.isValidSearch = !!this.inputSearch && this.inputSearch.length > 1;
    return this.isValidSearch;
  }
}
