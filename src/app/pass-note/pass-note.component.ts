import {Component, OnInit} from '@angular/core';
import {PassDataService} from '../services/pass-data.service';
import {BsModalRef, BsModalService, PageChangedEvent} from 'ngx-bootstrap';
import {PassNoteViewComponent} from '../pass-note-view/pass-note-view.component';
import {PassNote} from '../model/pass-note';

@Component({
  selector: 'app-pass-note',
  templateUrl: './pass-note.component.html',
  styleUrls: ['./pass-note.component.css']
})
export class PassNoteComponent implements OnInit {
  bsModalRef: BsModalRef;
  maxPageSize = 10;
  startItem: number;
  endItem: number;

  ngOnInit(): void {
  }

  constructor(public passDataService: PassDataService, private modalService: BsModalService) { }

  public getPassNotes(): Array<PassNote> {
    return this.passDataService.getPassNotes();
  }

  public getDisplayNotes(): Array<PassNote> {
    if (this.getPageCount() === 1) {
      return this.getPassNotes();
    } else {
      return this.getPassNotes().slice(this.startItem, this.endItem);
    }
  }

  public getPageCount(): number {
    return Math.ceil(this.getPassNotes().length / this.maxPageSize);
  }

  onPassNoteClick(event, passNote: PassNote) {
    console.log('Click passnote: ' + passNote.user);
    const initialState = {
      passNote: passNote
    };
    this.bsModalRef = this.modalService.show(PassNoteViewComponent, {initialState});
  }

  pageChanged(event: PageChangedEvent): void {
    this.startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
  }
}
