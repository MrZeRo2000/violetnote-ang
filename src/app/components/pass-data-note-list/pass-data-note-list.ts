import {Component, computed, effect, inject, TemplateRef, viewChild} from '@angular/core';
import {PassDataSelectionService} from '../../services/pass-data-selection-service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {PassCategory, PassNote} from '../../models/pass-data';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {PassDataService} from '../../services/pass-data-service';
import {MatDialog} from '@angular/material/dialog';
import {PassDataNoteViewForm} from '../pass-data-note-view-form/pass-data-note-view-form';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CopyUserPasswordPanel} from '../copy-user-password-panel/copy-user-password-panel';
import {PassDataNoteEditForm} from '../pass-data-note-edit-form/pass-data-note-edit-form';
import {PassDataCRUDService} from '../../services/pass-data-crud-service';
import {CdkDragDrop, CdkDragEnd, DragDropModule} from '@angular/cdk/drag-drop';
import {ConfirmationDialogForm} from '../confirmation-dialog-form/confirmation-dialog-form';
import {UrlUtils} from '../../utils/url-utils';
import {PaginatorService} from '../../services/paginator-service';
import {ScreenService} from '../../services/screen-service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-pass-data-note-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    CopyUserPasswordPanel,
    DragDropModule,
    AsyncPipe,
  ],
  templateUrl: './pass-data-note-list.html',
  styleUrl: './pass-data-note-list.scss'
})
export class PassDataNoteList {
  private readonly confirmationContentTemplate = viewChild<TemplateRef<any>>('confirmationContentTemplate');
  private readonly paginator = viewChild(MatPaginator);
  private readonly sort = viewChild(MatSort);
  private readonly passDataSelectionService = inject(PassDataSelectionService)
  private readonly passDataService = inject(PassDataService)
  private passDataCRUDService = inject(PassDataCRUDService)
  private readonly dialog = inject(MatDialog);
  private paginatorService = inject(PaginatorService)
  private screenService = inject(ScreenService);

  UrlUtils = UrlUtils;
  mediumScreen$ = this.screenService.mediumScreen$

  passDataModeReadOnly = this.passDataService.passDataModeReadOnlySignal
  selectedNotes = this.passDataSelectionService.selectedNotesSignal

  // Pure: the data source only reflects the currently selected notes. Wiring of
  // the paginator/sort is handled reactively by the effect below — keeping this
  // computed free of side effects.
  dataSource = computed(() => new MatTableDataSource<PassNote>(this.selectedNotes()));

  displayedColumns: string[] = ['system', 'user', 'url', 'actions'];

  constructor() {
    // Attach/detach the paginator and sort reactively whenever the data source,
    // the view-mode, or the queried view children change. The paginator is only
    // rendered in read-only mode, so its viewChild signal flips between defined
    // and undefined as the mode toggles; reading the signals here re-runs the
    // effect once they resolve, removing the need for setTimeout/ngAfterViewInit
    // timing hacks under zoneless change detection.
    effect(() => {
      const dataSource = this.dataSource();
      const sort = this.sort();
      const paginator = this.paginator();

      if (this.passDataModeReadOnly()) {
        if (sort) {
          dataSource.sort = sort;
        }
        if (paginator) {
          this.paginatorService.setupPaginator(paginator);
          dataSource.paginator = paginator;
        }
      } else {
        dataSource.paginator = null;
        if (sort) {
          sort.active = '';
          sort.direction = '';
          dataSource.sort = sort;
          sort.sortChange.emit();
        }
      }
    });
  }

  onRowClicked(row: PassNote) {
    console.log(`Clicked: ${JSON.stringify(row)}`);
    this.dialog.open(PassDataNoteViewForm, {
      data: row,
      minWidth: "450px"
    })
  }

  onPageChange(event: PageEvent) {
    this.paginatorService.pageSize = event.pageSize
  }

  onNoteDragStarted() {
    this.passDataSelectionService.noteDragInProgress.set(true);
  }

  onNoteDragEnded(event: CdkDragEnd) {
    const targetCategory = this.passDataSelectionService.noteDragHoveredCategory();
    if (targetCategory) {
      const note: PassNote = event.source.data;
      this.passDataSelectionService.noteDragHoveredCategory.set(null);
      this.onNoteDroppedOnCategory(note, targetCategory);
    }
    this.passDataSelectionService.noteDragInProgress.set(false);
  }

  onNoteDroppedOnCategory(note: PassNote, targetCategory: PassCategory): void {
    const selectedCategory = this.passDataSelectionService.firstSelectedCategory();
    if (selectedCategory){
      this.passDataSelectionService.selectedCategoryName.set(targetCategory.categoryName)
      this.passDataCRUDService.movePassNoteToOtherCategory(selectedCategory, targetCategory, note);
    }
  }

  onDrop(event: CdkDragDrop<any>) {
    console.log(
      'PassDataNoteList Drag drop from index:',
      event.previousIndex,
      ' to index:',
      event.currentIndex);
    const selectedCategory = this.passDataSelectionService.firstSelectedCategory();
    if (selectedCategory && (event.previousIndex !== event.currentIndex)) {
      this.passDataSelectionService.selectedCategoryName.set(selectedCategory.categoryName)
      this.passDataCRUDService.movePassNote(selectedCategory, event.previousIndex, event.currentIndex);
    }
  }

  onEditClick(event: any, item: PassNote) {
    event.stopPropagation();

    const dialogRef = this.dialog.open(PassDataNoteEditForm, {
      data: item,
      minWidth: "650px",
    })

    dialogRef.afterClosed().subscribe(result => {
      const selectedCategory = this.passDataSelectionService.firstSelectedCategory();
      if (result && selectedCategory) {
        this.passDataSelectionService.selectedCategoryName.set(selectedCategory.categoryName)
        this.passDataCRUDService.updatePassNote(selectedCategory, item, result);
      }
    })

  }

  onAddClick(event: any) {
    event.stopPropagation();

    const dialogRef = this.dialog.open(PassDataNoteEditForm, {
      minWidth: "650px",
    })

    dialogRef.afterClosed().subscribe(result => {
      const selectedCategory = this.passDataSelectionService.firstSelectedCategory();
      if (result && selectedCategory) {
        this.passDataSelectionService.selectedCategoryName.set(selectedCategory.categoryName)
        this.passDataCRUDService.addPassNote(selectedCategory, result);
      }
    })
  }

  onDeleteClick(event: any, item: PassNote) {
    event.stopPropagation()


    const dialogRef = this.dialog.open(ConfirmationDialogForm, {
      data: {
        contentTemplate: this.confirmationContentTemplate(),
        contentContext: {item}
      },
      minWidth: "350px"
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result for confirmation ${JSON.stringify(result)}`);
      if (result) {
        const selectedCategory = this.passDataSelectionService.firstSelectedCategory();
        if (selectedCategory) {
          this.passDataSelectionService.selectedCategoryName.set(selectedCategory.categoryName)
          this.passDataCRUDService.deletePassNote(selectedCategory, item);
        }
      }
    })
  }
}
