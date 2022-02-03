import {Component, OnDestroy, OnInit} from '@angular/core';
import {OperationMode, PassDataService} from '../services/pass-data.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {PageChangedEvent} from 'ngx-bootstrap/pagination';
import {PassNoteViewComponent} from '../pass-note-view/pass-note-view.component';
import {EditButtonType} from '../edit-panel/edit-panel.component';
import {PassNote} from '../model/pass-note';
import {PagerHandler} from '../pager-handler';
import {PagerStatus} from '../model/pager-status';
import {Subject, Subscription} from 'rxjs';
import {ConfirmationModalDialogComponent} from '../confirmation-modal-dialog/confirmation-modal-dialog.component';
import {PassNoteEditComponent} from '../pass-note-edit/pass-note-edit.component';
import {PassCategory} from '../model/pass-category';
import {UrlUtils} from '../utils/url-utils';

@Component({
  selector: 'app-pass-note',
  templateUrl: './pass-note.component.html',
  styleUrls: ['./pass-note.component.scss']
})
export class PassNoteComponent implements OnInit, OnDestroy {
  EditButtonType = EditButtonType;
  UrlUtils = UrlUtils;

  bsModalRef: BsModalRef;
  maxPageSize = 8;

  private pagerHandler: PagerHandler<PassNote> = new PagerHandler<PassNote>(this.maxPageSize);
  pagerStatus: PagerStatus<PassNote>;

  selectedPassCategory: PassCategory;
  selectedPassNote: PassNote;
  selectedPassNotes: Array<PassNote>;

  movePassCategoryNameList: Array<String> = [];

  editMode = false;

  private passCategorySubscription: Subscription;
  private passNoteSubscription: Subscription;
  private passNotesSubscription: Subscription;
  private selectedPassNotesSubscription: Subscription;
  private pagerStatusSubscription: Subscription;
  private operationModeSubscription: Subscription;

  constructor(public passDataService: PassDataService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.passCategorySubscription = this.passDataService.currentPassCategory.subscribe((passCategory) => {
      this.selectedPassCategory = passCategory;
      this.passCategoryChanged();
    });
    this.pagerStatusSubscription = this.pagerHandler.pagerStatusSubject.subscribe((pagerStatus) => {
      this.pagerStatus = pagerStatus;
    });
    this.passNoteSubscription = this.passDataService.currentPassNote.subscribe(pn => this.selectedPassNote = pn);
    this.selectedPassNotesSubscription = this.passDataService.selectedPassNotes.subscribe(passNotes => {
      this.selectedPassNotes = passNotes;
    });
    this.passNotesSubscription = this.passDataService.updatedPassNotes.subscribe(passNotes => {
      console.log(`PassNote: updatedPassNotes changed`);
      this.pagerHandler.updatePageItems(passNotes, this.maxPageSize);
    });
    this.operationModeSubscription =
      this.passDataService.currentOperationMode.subscribe(om => this.editMode = om !== OperationMode.OM_VIEW);
  }

  ngOnDestroy(): void {
    this.passCategorySubscription.unsubscribe();
    this.pagerStatusSubscription.unsubscribe();
    this.passNoteSubscription.unsubscribe();
    this.passNotesSubscription.unsubscribe();
    this.selectedPassNotesSubscription.unsubscribe();
    this.operationModeSubscription.unsubscribe();
  }

  public dragDisabled(): boolean {
    return !this.editMode || !this.pagerStatus || this.pagerStatus.displayedItems.length < 2;
  }

  public noteSelected(passNote: PassNote): boolean {
    return passNote === this.selectedPassNote || (this.selectedPassNotes && this.selectedPassNotes.includes(passNote));
  }

  private passCategoryChanged() {
    console.log(`PassNote: category changed`);
    setTimeout(() => {
      this.pagerStatus.currentPage = 1;
    }, 0);
    this.pagerHandler.setPageItems(this.selectedPassCategory.noteList);

    this.movePassCategoryNameList = this.passDataService.getPassData().categoryList
      .filter(v => v !== this.selectedPassCategory)
      .map(value => value.categoryName);
    console.log('movePassCategoryNameList:' + JSON.stringify(this.movePassCategoryNameList));
  }

  onPassNoteClick(event, passNote: PassNote) {
    if (this.editMode) {
      if (event.ctrlKey) {
        // for multiple selection
        this.passDataService.selectMultipleNote(passNote);
      } else {
        this.passDataService.selectOneNote(passNote);
        // this.passDataService.currentPassNote.next(passNote);
      }
    } else {
      const viewPassNote = new PassNote(
        passNote.system,
        passNote.user,
        passNote.password,
        passNote.url,
        passNote.info
      );
      const initialState = {
        passNote: viewPassNote
      };
      this.bsModalRef = this.modalService.show(PassNoteViewComponent, {initialState, ignoreBackdropClick: true});
    }
  }

  onEditButtonClick(event: EditButtonType) {
    if ([this.EditButtonType.BT_ADD, this.EditButtonType.BT_EDIT, this.EditButtonType.BT_DUPLICATE].includes(event)) {
      this.performEdit(event);
    } else if (event === this.EditButtonType.BT_DELETE) {
      this.performDelete();
    }
  }

  onDrop(event: any): void {
    const fromIndex = event.previousIndex;
    const toIndex = event.currentIndex;
    if (fromIndex !== toIndex) {
      const globalFromIndex =
        this.selectedPassCategory.noteList.indexOf(this.pagerStatus.displayedItems[fromIndex]);
      const globalToIndex =
        this.selectedPassCategory.noteList.indexOf(this.pagerStatus.displayedItems[toIndex]);
      if (globalFromIndex !== -1 && globalToIndex !== -1 && globalFromIndex !== globalToIndex) {
        this.passDataService.movePassNote(this.selectedPassCategory, globalFromIndex, globalToIndex);
      }
    }
  }

  onMoveToOtherCategory(event, passCategoryName): void {
    event.preventDefault();
    const result: Subject<PassCategory> = new Subject<PassCategory>();
    result.subscribe(value => {
      // this.passDataService.deletePassNote(value);
      console.log(`Moving ${JSON.stringify(this.selectedPassNotes)} to ${value.categoryName}`);
      // this.selectedPassNotes.forEach(pn => pn.passCategory = value);
      // this.passDataService.currentPassDataDirty.next(true);
      this.passDataService.movePassNotesToOtherCategory(this.selectedPassNotes, this.selectedPassCategory, value);
      this.passDataService.setSelectedPassCategory(this.passDataService.getSelectedPassCategory());
    });

    const passCategory: PassCategory = this.passDataService.getPassData().categoryList
      .find(value => value.categoryName === passCategoryName);
    if (passCategory) {
      const message = `Selected notes will be moved to <strong>${passCategory.categoryName}</strong>. Are you sure?`;
      const initialState = {message, item: passCategory, result};
      this.modalService.show(ConfirmationModalDialogComponent, {initialState});
    }

  }

  onPageAllClick(event) {
    event.preventDefault();
    this.pagerHandler.pageAll();
  }

  pageChanged(event: PageChangedEvent): void {
    this.pagerHandler.pageChanged(event.page, event.itemsPerPage);
    this.passDataService.clearNoteSelection();
  }

  private performEdit(event: EditButtonType): void {
    const result: Subject<PassNote> = new Subject<PassNote>();
    result.subscribe(value => {
      if (event === this.EditButtonType.BT_EDIT) {
        this.passDataService.updatePassNote(this.selectedPassCategory, this.selectedPassNote, value);
      } else {
        this.passDataService.insertPassNote(this.selectedPassCategory, value);
      }
    });
    const item = event === this.EditButtonType.BT_EDIT ? this.selectedPassNote : null;
    const duplicateItem = event === this.EditButtonType.BT_DUPLICATE ? this.selectedPassNote : null;
    const initialState = {
      item,
      duplicateItem,
      items: this.passDataService.getPassNotes(),
      passCategory: this.passDataService.getSelectedPassCategory(),
      result
    };

    this.modalService.show(PassNoteEditComponent, {initialState, ignoreBackdropClick: true});
  }

  private performDelete(): void {
    const result: Subject<PassNote> = new Subject<PassNote>();
    result.subscribe(value => {
      this.passDataService.deletePassNote(this.selectedPassCategory, value);
    });
    const message = `<strong>${this.selectedPassNote.system}/${this.selectedPassNote.user}</strong> will be deleted. Are you sure?`;
    const initialState = {message, item: this.selectedPassNote, result};

    this.modalService.show(ConfirmationModalDialogComponent, {initialState});
  }

}
