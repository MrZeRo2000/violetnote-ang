import {Component, OnInit} from '@angular/core';
import {PassDataService} from '../services/pass-data.service';
import {BsModalRef, BsModalService, PageChangedEvent} from 'ngx-bootstrap';
import {PassNoteViewComponent} from '../pass-note-view/pass-note-view.component';
import {PassNote} from '../model/pass-note';
import {PagerHandler} from '../pager-handler';

@Component({
  selector: 'app-pass-note',
  templateUrl: './pass-note.component.html',
  styleUrls: ['./pass-note.component.css']
})
export class PassNoteComponent implements OnInit {
  bsModalRef: BsModalRef;
  maxPageSize = 10;

  private pagerHandler: PagerHandler<PassNote> = new PagerHandler<PassNote>();

  passNotes: Array<PassNote>;
  displayNotes: Array<PassNote>;
  pageCount: number;

  ngOnInit(): void {
    this.passDataService.currentPassCategory.subscribe(() => this.passCategoryChanged());
  }

  constructor(public passDataService: PassDataService, private modalService: BsModalService) { }

  private passCategoryChanged() {
    this.passNotes = this.passDataService.getPassNotes();
    this.pagerHandler.setPageItems(this.passNotes);
    this.displayNotes = this.pagerHandler.getDisplayedItems();
    this.pageCount = this.pagerHandler.getPageCount();
    console.log('PageCount=' + this.pageCount);
    /*
    this.passNotes = this.passDataService.getPassNotes();
    this.pageCount = Math.ceil(this.passNotes.length / this.maxPageSize);
    if (this.pageCount === 1) {
      this.displayNotes = this.passNotes;
    } else {
      this.displayNotes = this.passNotes.slice(0, this.maxPageSize);
    }
    */
  }

  onPassNoteClick(event, passNote: PassNote) {
    const initialState = {
      passNote: passNote
    };
    this.bsModalRef = this.modalService.show(PassNoteViewComponent, {initialState});
  }

  onPageAllClick(event) {
    event.preventDefault();
    console.log('Page all click');
  }

  pageChanged(event: PageChangedEvent): void {
    this.pagerHandler.pageChanged(event.page, event.itemsPerPage);
    this.displayNotes = this.pagerHandler.getDisplayedItems();
    /*
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.displayNotes = this.passNotes.slice(startItem, endItem);
    */
  }
}
