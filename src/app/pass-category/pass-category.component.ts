import {Component, OnDestroy, OnInit} from '@angular/core';
import {OperationMode, PassDataService} from '../services/pass-data.service';
import {PassData} from '../model/pass-data';
import {PassCategory} from '../model/pass-category';
import {Subject, Subscription} from 'rxjs';
import {EditButtonType} from '../edit-panel/edit-panel.component';
import {BsModalService} from 'ngx-bootstrap/modal';
import {PassCategoryEditComponent} from '../pass-category-edit/pass-category-edit.component';
import {ConfirmationModalDialogComponent} from '../confirmation-modal-dialog/confirmation-modal-dialog.component';

@Component({
  selector: 'app-pass-category',
  templateUrl: './pass-category.component.html',
  styleUrls: ['./pass-category.component.scss']
})
export class PassCategoryComponent implements OnInit, OnDestroy {
  EditButtonType = EditButtonType;

  passData: PassData;
  selectedPassCategory: PassCategory;
  editMode = false;

  hasSelectedNotes = false;

  private passDataSubscription: Subscription;
  private passCategorySubscription: Subscription;
  private passNotesSubscription: Subscription;
  private operationModeSubscription: Subscription;

  constructor(private modalService: BsModalService, private passDataService: PassDataService) {
    this.passDataSubscription =
      passDataService.currentPassData.subscribe((passData) => this.passData = passData);
    this.passCategorySubscription =
      passDataService.currentPassCategory.subscribe((passCategory) => {
        this.selectedPassCategory = passCategory;
        this.hasSelectedNotes = this.passDataService.getPassNotes().length > 0;
      });
    this.passNotesSubscription =
      this.passDataService.updatedPassNotes.subscribe(passNotes => {
        this.hasSelectedNotes = this.passDataService.getPassNotes().length > 0;
      });
    this.operationModeSubscription =
      passDataService.currentOperationMode.subscribe(value => this.editMode = value !== OperationMode.OM_VIEW);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.passDataSubscription.unsubscribe();
    this.passCategorySubscription.unsubscribe();
    this.passNotesSubscription.unsubscribe();
    this.operationModeSubscription.unsubscribe();
  }

  public dragDisabled(): boolean {
    return !this.editMode || !this.passData.categoryList || this.passData.categoryList.length < 2;
  }

  onPassCategoryClick(event, passCategory) {
    event.preventDefault();
    this.passDataService.setSelectedPassCategory(passCategory);
  }

  onEditButtonClick(event: EditButtonType) {
    // console.log(`clicked: ${event}`);
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
      this.passDataService.movePassCategory(fromIndex, toIndex);
    }
  }

  private performEdit(editing: boolean): void {
    const result: Subject<PassCategory> = new Subject<PassCategory>();
    result.subscribe(value => {
      if (editing) {
        this.passDataService.updatePassCategory(value);
      } else {
        this.passDataService.insertPassCategory(value);
      }
    });
    const item = editing ? this.selectedPassCategory : null;
    const initialState = {item, items: this.passDataService.getPassData().categoryList, result};

    this.modalService.show(PassCategoryEditComponent, {initialState, ignoreBackdropClick: true});
  }

  private performDelete(): void {
    const result: Subject<PassCategory> = new Subject<PassCategory>();
    result.subscribe(value => {
      this.passDataService.deletePassCategory(value);
    });
    const message = `<strong>${this.selectedPassCategory.categoryName}</strong> will be deleted. Are you sure?`;
    const initialState = {message, item: this.selectedPassCategory, result};

    this.modalService.show(ConfirmationModalDialogComponent, {initialState});
  }

}
