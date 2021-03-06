import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {OperationMode, PassDataService} from '../services/pass-data.service';
import {PassNote} from '../model/pass-note';
import {BsModalRef, BsModalService, PageChangedEvent} from 'ngx-bootstrap';
import {PassNoteViewComponent} from '../pass-note-view/pass-note-view.component';
import {PagerHandler} from '../pager-handler';
import {PagerStatus} from '../model/pager-status';
import {Subject, Subscription} from 'rxjs';
import {EditButtonType} from '../edit-panel/edit-panel.component';
import {ConfirmationModalDialogComponent} from '../confirmation-modal-dialog/confirmation-modal-dialog.component';
import {PassNoteEditComponent} from '../pass-note-edit/pass-note-edit.component';
import {PassNoteSearch} from '../model/pass-note-search';

@Component({
  selector: 'app-search-notes',
  templateUrl: './search-notes.component.html',
  styleUrls: ['./search-notes.component.scss']
})
export class SearchNotesComponent implements OnInit, OnDestroy {
  EditButtonType = EditButtonType;

  bsModalRef: BsModalRef;
  searchText: string;
  maxPageSize = 8;

  private pagerHandler: PagerHandler<PassNoteSearch> = new PagerHandler<PassNoteSearch>(this.maxPageSize);
  pagerStatus: PagerStatus<PassNoteSearch>;

  searchPassNotes: Array<PassNoteSearch>;
  selectedPassNote: PassNoteSearch;
  editMode = false;

  private activatedRouteParamsSubscription: Subscription;
  private pagerStatusSubscription: Subscription;
  private operationModeSubscription: Subscription;

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
        this.updateSearchPassNotes();
        this.pagerStatusSubscription = this.pagerHandler.pagerStatusSubject.subscribe((pagerStatus) => {
          this.pagerStatus = pagerStatus;
        });

        this.operationModeSubscription =
          this.passDataService.currentOperationMode.subscribe(om => {
            this.editMode = om === OperationMode.OM_EDIT;
            this.updateCurrentPassNote();
          });
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
    if (this.operationModeSubscription) {
      this.operationModeSubscription.unsubscribe();
    }
    this.activatedRouteParamsSubscription.unsubscribe();
  }

  onPassNoteClick(event, passNoteSearch: PassNoteSearch) {
    if (this.editMode) {
      this.selectedPassNote = passNoteSearch;
      this.passDataService.selectOneNote(passNoteSearch.passNote);
    } else {
      const viewPassNote = new PassNote(
        passNoteSearch.passNote.system,
        passNoteSearch.passNote.user,
        passNoteSearch.passNote.password,
        passNoteSearch.passNote.url,
        passNoteSearch.passNote.info
      );
      const initialState = {
        passNote: viewPassNote
      };
      this.bsModalRef = this.modalService.show(PassNoteViewComponent, {initialState});
    }
  }

  private updateSearchPassNotes(): void {
    this.searchPassNotes = this.passDataService.getPassNotesSearch(this.searchText);
    this.pagerHandler.setPageItems(this.searchPassNotes);
  }

  private updateCurrentPassNote(): void {
    if (this.editMode) {
      if (this.searchPassNotes && this.searchPassNotes.length > 0) {
        this.passDataService.selectOneNote(this.searchPassNotes[0].passNote);
      }
    } else {
      this.passDataService.clearNoteSelection();
    }
  }

  searchInfoButtonClick(event) {
    this.passDataService.clearNoteSelection();
    this.router.navigate(['main']);
  }

  onPageAllClick(event) {
    event.preventDefault();
    this.pagerHandler.pageAll();
  }

  onEditButtonClick(event: EditButtonType) {
    if ([this.EditButtonType.BT_ADD, this.EditButtonType.BT_EDIT].includes(event)) {
      this.performEdit();
    } else if (event === this.EditButtonType.BT_DELETE) {
      this.performDelete();
    }
  }

  pageChanged(event: PageChangedEvent): void {
    this.pagerHandler.pageChanged(event.page, event.itemsPerPage);
    if (this.editMode && this.pagerStatus.displayedItems && this.pagerStatus.displayedItems.length > 0) {
      this.passDataService.selectOneNote(this.pagerStatus.displayedItems[0].passNote);
    } else {
      this.passDataService.clearNoteSelection();
    }
  }

  private passNoteChanged(): void {
    this.updateSearchPassNotes();
    this.updateCurrentPassNote();
  }

  private performDelete(): void {
    const result: Subject<PassNote> = new Subject<PassNote>();
    result.subscribe(value => {
      this.passDataService.deletePassNote(this.selectedPassNote.passCategory, value);
      this.passNoteChanged();
    });
    const message = `<strong>${this.selectedPassNote.passNote.system}/${this.selectedPassNote.passNote.user}</strong> will be deleted. Are you sure?`;
    const initialState = {message, item: this.selectedPassNote.passNote, result};

    this.modalService.show(ConfirmationModalDialogComponent, {initialState});
  }

  private performEdit(): void {
    const result: Subject<PassNote> = new Subject<PassNote>();
    result.subscribe(value => {
      this.passDataService.updatePassNote(this.selectedPassNote.passCategory, this.selectedPassNote.passNote, value);
      this.passNoteChanged();
    });
    const item = this.selectedPassNote;
    const initialState = {
      item: item.passNote,
      items: this.passDataService.getPassNotesByCategory(item.passCategory),
      passCategory: item.passCategory,
      result
    };

    this.modalService.show(PassNoteEditComponent, {initialState, ignoreBackdropClick: true});
  }

}
