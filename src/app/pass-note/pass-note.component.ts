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

  passNotes: Array<PassNote>;
  displayNotes: Array<PassNote>;
  pageCount: number;

  ngOnInit(): void {
    this.passCategoryChanged();
    this.passDataService.getPassCategoryUpdatedEvent().subscribe((passCategory) => {
      this.passCategoryChanged();
    });
  }

  constructor(public passDataService: PassDataService, private modalService: BsModalService) { }

  private passCategoryChanged() {
    this.passNotes = this.passDataService.getPassNotes();
    this.pageCount = Math.ceil(this.passNotes.length / this.maxPageSize);
    if (this.pageCount === 1) {
      this.displayNotes = this.passNotes;
    } else {
      this.displayNotes = this.passNotes.slice(0, this.maxPageSize);
    }
  }

  onPassNoteClick(event, passNote: PassNote) {
    console.log('Click passnote: ' + passNote.user);
    const initialState = {
      passNote: passNote
    };
    this.bsModalRef = this.modalService.show(PassNoteViewComponent, {initialState});
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.displayNotes = this.passNotes.slice(startItem, endItem);
  }
}
