import {Component, OnDestroy, OnInit} from '@angular/core';
import {OperationMode, PassDataService} from '../services/pass-data.service';
import {BsModalRef, BsModalService, PageChangedEvent} from 'ngx-bootstrap';
import {PassNoteViewComponent} from '../pass-note-view/pass-note-view.component';
import {PassNote} from '../model/pass-note';
import {PagerHandler} from '../pager-handler';
import {PagerStatus} from '../model/pager-status';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-pass-note',
  templateUrl: './pass-note.component.html',
  styleUrls: ['./pass-note.component.scss']
})
export class PassNoteComponent implements OnInit, OnDestroy {
  bsModalRef: BsModalRef;
  maxPageSize = 8;

  private pagerHandler: PagerHandler<PassNote> = new PagerHandler<PassNote>(this.maxPageSize);
  pagerStatus: PagerStatus<PassNote>;

  operationMode: OperationMode;
  selectedPassNote: PassNote;

  private passCategorySubscription: Subscription;
  private passNoteSubscription: Subscription;
  private pagerStatusSubscription: Subscription;

  constructor(public passDataService: PassDataService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.passCategorySubscription = this.passDataService.currentPassCategory.subscribe(() => this.passCategoryChanged());
    this.pagerStatusSubscription = this.pagerHandler.pagerStatusSubject.subscribe((pagerStatus) => {
      this.pagerStatus = pagerStatus;
    });
    this.passNoteSubscription = this.passDataService.currentPassNote.subscribe(pn => this.selectedPassNote = pn);
    this.passDataService.currentOperationMode.subscribe(om => this.operationMode = om);
  }

  ngOnDestroy(): void {
    this.passCategorySubscription.unsubscribe();
    this.pagerStatusSubscription.unsubscribe();
    this.passNoteSubscription.unsubscribe();
  }

  private passCategoryChanged() {
    console.log(`PassNote: category changed`);
    setTimeout(() => {
      this.pagerStatus.currentPage = 1;
    }, 0);
    this.pagerHandler.setPageItems(this.passDataService.getPassNotes());
  }

  onPassNoteClick(event, passNote: PassNote) {
    if (this.operationMode === OperationMode.OM_EDIT) {
     this.passDataService.currentPassNote.next(passNote);
    } else {
      const viewPassNote = new PassNote();
      Object.assign(viewPassNote, passNote);
      const initialState = {
        passNote: viewPassNote
      };
      this.bsModalRef = this.modalService.show(PassNoteViewComponent, {initialState});
    }
  }

  onPageAllClick(event) {
    event.preventDefault();
    this.pagerHandler.pageAll();
  }

  pageChanged(event: PageChangedEvent): void {
    this.pagerHandler.pageChanged(event.page, event.itemsPerPage);
    this.passDataService.currentPassNote.next(null);
  }
}
