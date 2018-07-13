import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {PassDataService} from '../services/pass-data.service';
import {PassNote} from '../model/pass-note';

@Component({
  selector: 'app-search-notes',
  templateUrl: './search-notes.component.html',
  styleUrls: ['./search-notes.component.css']
})
export class SearchNotesComponent implements OnInit {
  searchPassNotes: Array<PassNote>;
  searchText: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private passDataService: PassDataService
  ) {
    console.log('search-notes constructor');
    activatedRoute.params.subscribe(
      params => {
        this.searchText = params['text'];
        this.searchPassNotes = this.passDataService.getSearchPassNotes(this.searchText);
      });
  }

  ngOnInit() {
    console.log('search-notes init');
    if (!this.passDataService.isPassData()) {
      this.router.navigate(['password']);
    }
  }

  onPassNoteClick(event, passNote: PassNote) {
    console.log('Clicked ' + passNote.user);
  }

  searchInfoButtonClick(event) {
    this.router.navigate(['main']);
  }
}
