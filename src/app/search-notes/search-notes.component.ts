import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {PassDataService} from '../services/pass-data.service';

@Component({
  selector: 'app-search-notes',
  templateUrl: './search-notes.component.html',
  styleUrls: ['./search-notes.component.css']
})
export class SearchNotesComponent implements OnInit {
  searchString: string;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private passDataService: PassDataService
  ) {
    activatedRoute.queryParams.subscribe(
      params => this.searchString = params['searchString']
      );
  }

  ngOnInit() {
    if (!this.passDataService.isPassData()) {
      this.router.navigate(['password']);
    } else if (this.searchString === undefined) {
      this.router.navigate(['main']);
    }

    // this.passDataService.getSearchPassNotes(this.searchString);
  }
}
