import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {OperationMode, PassDataService} from '../services/pass-data.service';
import {PassNote} from '../model/pass-note';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {PageChangedEvent} from 'ngx-bootstrap/pagination';
import {PassNoteViewComponent} from '../pass-note-view/pass-note-view.component';
import {PagerHandler} from '../pager-handler';
import {PagerStatus} from '../model/pager-status';
import {Subject, Subscription} from 'rxjs';
import {EditButtonType} from '../edit-panel/edit-panel.component';
import {ConfirmationModalDialogComponent} from '../confirmation-modal-dialog/confirmation-modal-dialog.component';
import {PassNoteEditComponent} from '../pass-note-edit/pass-note-edit.component';
import {PassNoteSearch} from '../model/pass-note-search';
import {FilterItem} from '../drop-down-filter/drop-down-filter.component';

enum FilterTypes {
  CATEGORY,
  SYSTEM,
  USER
}

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
  displaySearchPassNotes: Array<PassNoteSearch>;

  filterSearchCategoryNames: Array<FilterItem> = [];
  filterSearchSystems: Array<FilterItem> = [];
  filterSearchUsers: Array<FilterItem> = [];

  filters: Array<{filterType: FilterTypes, filterItems: Array<FilterItem>}> = [];

  filterTypeDefs: {[filterType in FilterTypes] : (value: PassNoteSearch) => string} = {
    [FilterTypes.CATEGORY]: v => v.passCategory.categoryName,
    [FilterTypes.SYSTEM]: v => v.passNote.system,
    [FilterTypes.USER]: v => v.passNote.user
  }

  filterSearch: {[filterType in FilterTypes] : Array<FilterItem>} = {
    [FilterTypes.CATEGORY]: [],
    [FilterTypes.SYSTEM]: [],
    [FilterTypes.USER]: []
  }

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
    event.preventDefault();

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
    this.filters = [];
    this.applyFilters();
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

  private processFilterSelection(filterType: FilterTypes, items: Array<FilterItem>, selectedItems: Array<FilterItem>) {
    items = selectedItems;

    const allSelected = FilterItem.allSelected(items);
    const filterIndex = this.filters.findIndex(v => v.filterType === filterType);

    if ((filterIndex === -1) && (!allSelected)) {
      this.filters.push({filterType, filterItems: items});
    } else if (allSelected && filterIndex > -1) {
      this.filters.splice(filterIndex, 1);
    } else if (filterIndex > -1) {
      this.filters[filterIndex].filterItems = items;
    }

    this.applyFilters();
  }

  categoryFilterChanged(items: Array<FilterItem>):void {
    this.processFilterSelection(FilterTypes.CATEGORY, this.filterSearchCategoryNames, items);
  }

  systemFilterChanged(items: Array<FilterItem>):void {
    this.processFilterSelection(FilterTypes.SYSTEM, this.filterSearchSystems, items);
  }

  userFilterChanged(items: Array<FilterItem>):void {
    this.processFilterSelection(FilterTypes.USER, this.filterSearchUsers, items);
  }

  private getSearchItems(m: (value: PassNoteSearch) => string, notes: Array<PassNoteSearch>, items: Array<FilterItem>): Array<FilterItem> {
    return [...new Set(notes.map(m))]
      .map(v => new FilterItem(v, items.findIndex(f => f.isSelected && f.value === v) !== -1));
  }

  private applyFilters(): void {
    let filteredNotes = this.searchPassNotes;

    /*
    for (let filterSearchKey in this.filterSearch) {
      this.filterSearch[filterSearchKey] = this.getSearchItems(this.filterTypeDefs[filterSearchKey], filteredNotes, this.filterSearch[filterSearchKey]);
    }
    
     */

    this.filterSearchCategoryNames = this.getSearchItems(v => v.passCategory.categoryName, filteredNotes, this.filterSearchCategoryNames);
    this.filterSearchSystems = this.getSearchItems(v => v.passNote.system, filteredNotes, this.filterSearchSystems);
    this.filterSearchUsers = this.getSearchItems(v => v.passNote.user, filteredNotes, this.filterSearchUsers);

    this.filters.forEach((value, index) => {
      const selectedItemValues = FilterItem.getFilterItemValues(value.filterItems);
      if (value.filterType === FilterTypes.CATEGORY) {
        filteredNotes = filteredNotes.filter(v => selectedItemValues.indexOf(v.passCategory.categoryName) !== -1);

        FilterItem.setSelected(this.filterSearchCategoryNames, selectedItemValues);
        this.filterSearchSystems = this.getSearchItems(v => v.passNote.system, filteredNotes, this.filterSearchSystems);
        this.filterSearchUsers = this.getSearchItems(v => v.passNote.user, filteredNotes, this.filterSearchUsers);

      } else if (value.filterType == FilterTypes.SYSTEM) {
        filteredNotes = filteredNotes.filter(v => selectedItemValues.indexOf(v.passNote.system) !== -1);

        FilterItem.setSelected(this.filterSearchSystems, selectedItemValues);
        this.filterSearchCategoryNames = this.getSearchItems(v => v.passCategory.categoryName, filteredNotes, this.filterSearchCategoryNames);
        this.filterSearchUsers = this.getSearchItems(v => v.passNote.user, filteredNotes, this.filterSearchUsers);

      } else if (value.filterType == FilterTypes.USER) {
        filteredNotes = filteredNotes.filter(v => selectedItemValues.indexOf(v.passNote.user) !== -1);

        FilterItem.setSelected(this.filterSearchUsers, selectedItemValues);
        this.filterSearchCategoryNames = this.getSearchItems(v => v.passCategory.categoryName, filteredNotes, this.filterSearchCategoryNames);
        this.filterSearchSystems = this.getSearchItems(v => v.passNote.system, filteredNotes, this.filterSearchSystems);

      } else {
        console.error(`Filter not found: ${JSON.stringify(value)}`)
      }

    });

    this.filters = this.filters.filter(v => !FilterItem.allSelected(v.filterItems));

    if (this.filters.findIndex(v => v.filterType === FilterTypes.CATEGORY) === -1) {
      FilterItem.setAllSelected(this.filterSearchCategoryNames);
    }
    if (this.filters.findIndex(v => v.filterType === FilterTypes.SYSTEM) === -1) {
      FilterItem.setAllSelected(this.filterSearchSystems);
    }
    if (this.filters.findIndex(v => v.filterType === FilterTypes.USER) === -1) {
      FilterItem.setAllSelected(this.filterSearchUsers);
    }

    this.displaySearchPassNotes = filteredNotes;
    this.pagerHandler.setPageItems(this.displaySearchPassNotes);
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
    this.selectedPassNote = undefined;
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
