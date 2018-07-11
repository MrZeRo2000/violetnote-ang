import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  inputSearch: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  private submitSearch() {
    this.router.navigate(['/search'], {queryParams: {searchString: this.inputSearch}});
  }

  onSearchKeyUp(event) {
    if (event.key === 'Enter') {
      this.submitSearch();
    }
  }

  onSubmitSearch(event) {
    this.submitSearch();
  }
}
