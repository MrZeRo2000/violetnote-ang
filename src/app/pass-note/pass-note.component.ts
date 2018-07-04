import { Component, OnInit } from '@angular/core';
import {PassDataService} from '../pass-data.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {PassNoteViewComponent} from '../pass-note-view/pass-note-view.component';
import {PassNote} from '../pass-note';

@Component({
  selector: 'app-pass-note',
  templateUrl: './pass-note.component.html',
  styleUrls: ['./pass-note.component.css']
})
export class PassNoteComponent implements OnInit {
  bsModalRef: BsModalRef;

  constructor(public passDataService: PassDataService, private modalService: BsModalService) { }

  ngOnInit() {
  }

  onPassNoteClick(event, passNote: PassNote) {
    console.log('Click passnote: ' + passNote.user);
    const initialState = {
      passNote: passNote
    };
    this.bsModalRef = this.modalService.show(PassNoteViewComponent, {initialState});
  }

}
