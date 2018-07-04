import { Component, OnInit } from '@angular/core';
import {PassDataService} from '../pass-data.service';

@Component({
  selector: 'app-pass-note',
  templateUrl: './pass-note.component.html',
  styleUrls: ['./pass-note.component.css']
})
export class PassNoteComponent implements OnInit {

  constructor(public passDataService: PassDataService) { }

  ngOnInit() {
  }

  onPassNoteClick(event, passNote) {
    console.log('Click passnote');
  }

}
