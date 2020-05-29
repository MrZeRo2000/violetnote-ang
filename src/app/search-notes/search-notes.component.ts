import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {OperationMode, PassDataService} from '../services/pass-data.service';
import {PassNote} from '../model/pass-note';
import {BsModalRef, BsModalService, PageChangedEvent} from 'ngx-bootstrap';
import {PassNoteViewComponent} from '../pass-note-view/pass-note-view.component';
import {PagerHandler} from '../pager-handler';
import {PagerStatus} from '../model/pager-status';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-search-notes',
  templateUrl: './search-notes.component.html',
  styleUrls: ['./search-notes.component.scss']
})
export class SearchNotesComponent implements OnInit, OnDestroy {
  bsModalRef: BsModalRef;
  searchText: string;
  maxPageSize = 8;

  private pagerHandler: PagerHandler<PassNote> = new PagerHandler<PassNote>(this.maxPageSize);
  pagerStatus: PagerStatus<PassNote>;

  operationMode: OperationMode;
  selectedPassNote: PassNote;

  private activatedRouteParamsSubscription: Subscription;
  private pagerStatusSubscription: Subscription;
  private passNoteSubscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private passDataService: PassDataService,
    private modalService: BsModalService
  ) {
    console.log('search-notes constructor');
    this.activatedRouteParamsSubscription = activatedRoute.params.subscribe(
      params => {
        this.searchText = params['text'];
        this.pagerHandler.setPageItems(this.passDataService.getSearchPassNotes(this.searchText));
        this.pagerStatusSubscription = this.pagerHandler.pagerStatusSubject.subscribe((pagerStatus) => {
          this.pagerStatus = pagerStatus;
        });

        this.passNoteSubscription = this.passDataService.currentPassNote.subscribe(pn => this.selectedPassNote = pn);
        this.passDataService.currentOperationMode.subscribe(om => this.operationMode = om);

        this.passDataService.currentPassNote.next(null);
      });
  }

  ngOnInit() {
    if (!this.passDataService.isPassData()) {
      this.router.navigate(['password']);
    }
  }

  ngOnDestroy(): void {
    if (this.pagerStatusSubscription) {
      this.pagerStatusSubscription.unsubscribe();
    }
    if (this.passNoteSubscription) {
      this.passNoteSubscription.unsubscribe();
    }
    this.activatedRouteParamsSubscription.unsubscribe();
  }

  onPassNoteClick(event, passNote: PassNote) {
    if (this.operationMode === OperationMode.OM_EDIT) {
      this.passDataService.currentPassNote.next(passNote);
    } else {
      const viewPassNote = new PassNote(
        passNote.passCategory,
        passNote.system,
        passNote.user,
        passNote.password,
        passNote.comments,
        passNote.custom,
        passNote.info
      );
      const initialState = {
        passNote: viewPassNote
      };
      this.bsModalRef = this.modalService.show(PassNoteViewComponent, {initialState});
    }
  }

  searchInfoButtonClick(event) {
    this.passDataService.currentPassNote.next(null);
    this.router.navigate(['main']);
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
