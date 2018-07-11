import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {PassDataService} from '../services/pass-data.service';

@Component({
  selector: 'app-search-notes',
  templateUrl: './search-notes.component.html',
  styleUrls: ['./search-notes.component.css']
})
export class SearchNotesComponent implements OnInit {
  searchText: string;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private passDataService: PassDataService
  ) {
    activatedRoute.params.subscribe(
      params => this.searchText = params['text']
      );
  }

  ngOnInit() {
    if (!this.passDataService.isPassData()) {
      this.router.navigate(['password']);
    } else if (this.searchText === undefined) {
      this.router.navigate(['main']);
    }

    // this.passDataService.getSearchPassNotes(this.searchText);
  }
}
