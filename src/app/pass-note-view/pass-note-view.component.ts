import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {PassNote} from '../pass-note';

@Component({
  selector: 'app-pass-note-view',
  templateUrl: './pass-note-view.component.html',
  styleUrls: ['./pass-note-view.component.css']
})
export class PassNoteViewComponent implements OnInit {
  title = 'Note';
  closeBtnName = 'Close';
  passNote: PassNote;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    setTimeout(() => {
      this.bsModalRef.hide();
    }, 10000);
  }
}
