import {Component, OnInit} from '@angular/core';
import {PassDataService} from '../services/pass-data.service';
import {BsModalRef, BsModalService, PageChangedEvent} from 'ngx-bootstrap';
import {PassNoteViewComponent} from '../pass-note-view/pass-note-view.component';
import {PassNote} from '../model/pass-note';
import {PagerHandler} from '../pager-handler';
import {PagerStatus} from '../model/pager-status';

@Component({
  selector: 'app-pass-note',
  templateUrl: './pass-note.component.html',
  styleUrls: ['./pass-note.component.scss']
})
export class PassNoteComponent implements OnInit {
  bsModalRef: BsModalRef;
  maxPageSize = 8;

  private pagerHandler: PagerHandler<PassNote> = new PagerHandler<PassNote>(this.maxPageSize);
  pagerStatus: PagerStatus<PassNote>;

  ngOnInit(): void {
    this.passDataService.currentPassCategory.subscribe(() => this.passCategoryChanged());
    this.pagerHandler.pagerStatusSubject.subscribe((pagerStatus) => {
      this.pagerStatus = pagerStatus;
    });
  }

  constructor(public passDataService: PassDataService, private modalService: BsModalService) { }

  private passCategoryChanged() {
    console.log(`PassNote: category changed`);
    setTimeout(() => {
      this.pagerStatus.currentPage = 1;
    }, 0);
    this.pagerHandler.setPageItems(this.passDataService.getPassNotes());
  }

  onPassNoteClick(event, passNote: PassNote) {
    const viewPassNote = new PassNote();
    Object.assign(viewPassNote, passNote);
    const initialState = {
      passNote: viewPassNote
    };
    this.bsModalRef = this.modalService.show(PassNoteViewComponent, {initialState});
  }

  onPageAllClick(event) {
    event.preventDefault();
    this.pagerHandler.pageAll();
  }

  pageChanged(event: PageChangedEvent): void {
    this.pagerHandler.pageChanged(event.page, event.itemsPerPage);
  }
}
