import {Component, OnDestroy, OnInit} from '@angular/core';
import {OperationMode, PassDataService} from '../services/pass-data.service';
import {BsModalRef, BsModalService, PageChangedEvent} from 'ngx-bootstrap';
import {PassNoteViewComponent} from '../pass-note-view/pass-note-view.component';
import {EditButtonType} from '../edit-panel/edit-panel.component';
import {PassNote} from '../model/pass-note';
import {PagerHandler} from '../pager-handler';
import {PagerStatus} from '../model/pager-status';
import {Subject, Subscription} from 'rxjs';
import {ConfirmationModalDialogComponent} from '../confirmation-modal-dialog/confirmation-modal-dialog.component';
import {PassNoteEditComponent} from '../pass-note-edit/pass-note-edit.component';

@Component({
  selector: 'app-pass-note',
  templateUrl: './pass-note.component.html',
  styleUrls: ['./pass-note.component.scss']
})
export class PassNoteComponent implements OnInit, OnDestroy {
  EditButtonType = EditButtonType;

  bsModalRef: BsModalRef;
  maxPageSize = 8;

  private pagerHandler: PagerHandler<PassNote> = new PagerHandler<PassNote>(this.maxPageSize);
  pagerStatus: PagerStatus<PassNote>;

  selectedPassNote: PassNote;
  editMode = false;

  private passCategorySubscription: Subscription;
  private passNoteSubscription: Subscription;
  private pagerStatusSubscription: Subscription;
  private operationModeSubscription: Subscription;

  constructor(public passDataService: PassDataService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.passCategorySubscription = this.passDataService.currentPassCategory.subscribe(() => this.passCategoryChanged());
    this.pagerStatusSubscription = this.pagerHandler.pagerStatusSubject.subscribe((pagerStatus) => {
      this.pagerStatus = pagerStatus;
    });
    this.passNoteSubscription = this.passDataService.currentPassNote.subscribe(pn => this.selectedPassNote = pn);
    this.operationModeSubscription =
      this.passDataService.currentOperationMode.subscribe(om => this.editMode = om === OperationMode.OM_EDIT);
  }

  ngOnDestroy(): void {
    this.passCategorySubscription.unsubscribe();
    this.pagerStatusSubscription.unsubscribe();
    this.passNoteSubscription.unsubscribe();
    this.operationModeSubscription.unsubscribe();
  }

  public dragDisabled(): boolean {
    return !this.editMode || !this.pagerStatus || this.pagerStatus.displayedItems.length < 2;
  }

  private passCategoryChanged() {
    console.log(`PassNote: category changed`);
    setTimeout(() => {
      this.pagerStatus.currentPage = 1;
    }, 0);
    this.pagerHandler.setPageItems(this.passDataService.getPassNotes());
  }

  onPassNoteClick(event, passNote: PassNote) {
    if (this.editMode) {
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
      this.bsModalRef = this.modalService.show(PassNoteViewComponent, {initialState, ignoreBackdropClick: true});
    }
  }

  onEditButtonClick(event: EditButtonType) {
    if ([this.EditButtonType.BT_ADD, this.EditButtonType.BT_EDIT].includes(event)) {
      this.performEdit(event === EditButtonType.BT_EDIT);
    } else if (event === this.EditButtonType.BT_DELETE) {
      this.performDelete();
    }
  }

  onDrop(event: any): void {
    const fromIndex = event.previousIndex;
    const toIndex = event.currentIndex;
    if (fromIndex !== toIndex) {
      this.passDataService.movePassNote(fromIndex, toIndex);
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

  private performEdit(editing: boolean): void {
    const result: Subject<PassNote> = new Subject<PassNote>();
    result.subscribe(value => {
      if (editing) {
        this.passDataService.updatePassNote(this.selectedPassNote, value);
      } else {
        this.passDataService.insertPassNote(value);
      }
    });
    const item = editing ? this.selectedPassNote : null;
    const initialState = {
      item,
      items: this.passDataService.getPassNotes(),
      passCategory: this.passDataService.getSelectedPassCategory(),
      result
    };

    this.modalService.show(PassNoteEditComponent, {initialState, ignoreBackdropClick: true});
  }

  private performDelete(): void {
    const result: Subject<PassNote> = new Subject<PassNote>();
    result.subscribe(value => {
      this.passDataService.deletePassNote(value);
    });
    const message = `<strong>${this.selectedPassNote.system}/${this.selectedPassNote.user}</strong> will be deleted. Are you sure?`;
    const initialState = {message, item: this.selectedPassNote, result};

    this.modalService.show(ConfirmationModalDialogComponent, {initialState});
  }

}
