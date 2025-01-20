import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {PassNote} from '../model/pass-note';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-pass-note-view',
    templateUrl: './pass-note-view.component.html',
    styleUrls: ['./pass-note-view.component.scss'],
    standalone: false
})
export class PassNoteViewComponent implements OnInit {
  title = 'Note';
  closeBtnName = 'Close';
  passNote: PassNote;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    if (environment.autoHidePassNoteDelay) {
      setTimeout(() => {
        this.bsModalRef.hide();
      }, environment.autoHidePassNoteDelay);
    }
  }
}
