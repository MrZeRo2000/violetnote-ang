import {AfterViewInit, Component, computed, effect, inject, TemplateRef, ViewChild} from '@angular/core';
import {PassDataSelectionService} from '../../services/pass-data-selection-service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {PassNote} from '../../models/pass-data';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {PassDataService} from '../../services/pass-data-service';
import {MatDialog} from '@angular/material/dialog';
import {PassDataNoteViewForm} from '../pass-data-note-view-form/pass-data-note-view-form';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CopyUserPasswordPanel} from '../copy-user-password-panel/copy-user-password-panel';
import {PassDataNoteEditForm} from '../pass-data-note-edit-form/pass-data-note-edit-form';
import {PassDataCRUDService} from '../../services/pass-data-crud-service';
import {CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';
import {ConfirmationDialogForm} from '../confirmation-dialog-form/confirmation-dialog-form';
import {UrlUtils} from '../../utils/url-utils';

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
  ],
  templateUrl: './pass-data-note-list.html',
  styleUrl: './pass-data-note-list.scss'
})
export class PassDataNoteList implements AfterViewInit {
  @ViewChild('confirmationContentTemplate') confirmationContentTemplate?: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private readonly passDataSelectionService = inject(PassDataSelectionService)
  private readonly passDataService = inject(PassDataService)
  private passDataCRUDService = inject(PassDataCRUDService)
  private readonly dialog = inject(MatDialog);

  UrlUtils = UrlUtils;

  passDataModeReadOnly = this.passDataService.passDataModeReadOnlySignal
  selectedNotes = this.passDataSelectionService.selectedNotesSignal
  previousNotesCount = -1
  dataSource = computed(() => {
    const currentSelectedNotes = this.selectedNotes();
    const newDataSource = new MatTableDataSource<PassNote>(currentSelectedNotes)

    if (this.paginator) {
      const currentNotesCount = currentSelectedNotes.length;

      if (this.previousNotesCount != -1) {
        if (currentNotesCount > this.previousNotesCount) {
          this.paginator.pageIndex = Math.ceil(this.paginator.length / this.paginator.pageSize);
        }
      }

      this.previousNotesCount = currentNotesCount
    }

    if (this.passDataModeReadOnly() && this.paginator) {
      newDataSource.sort = this.sort
      newDataSource.paginator = this.paginator
    }

    return newDataSource
  })

  displayedColumns: string[] = ['system', 'user', 'url', 'actions'];

  constructor() {
    effect(() => {
      if (this.passDataModeReadOnly()){
        setTimeout(() => {
          if (this.paginator) {
            this.paginator.pageIndex = 0;
            this.dataSource().paginator = this.paginator
          }
        }, 0)
      } else {
        this.dataSource().paginator = null
        setTimeout(() => {
          this.sort.active = ''
          this.sort.direction = ''
          this.dataSource().sort = this.sort;
          this.sort.sortChange.emit();
        }, 0)
      }
    })
  }

  ngAfterViewInit(): void {
    // Initial setup for paginator and sort.
    // The computed signal will handle updates.
    if (this.passDataModeReadOnly() && this.paginator) {
      this.dataSource().paginator = this.paginator;
      this.dataSource().sort = this.sort;
    }
  }

  onRowClicked(row: PassNote) {
    console.log(`Clicked: ${JSON.stringify(row)}`);
    this.dialog.open(PassDataNoteViewForm, {
      data: row,
      minWidth: "450px"
    })
  }

  onDrop(event: CdkDragDrop<any>) {
    console.log('Drag drop from index:', event.previousIndex, ' to index:', event.currentIndex);
    const selectedCategory = this.passDataSelectionService.firstSelectedCategory();
    if (selectedCategory && (event.previousIndex !== event.currentIndex)) {
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
        this.passDataCRUDService.addPassNote(selectedCategory, result);
      }
    })
  }

  onDeleteClick(event: any, item: PassNote) {
    event.stopPropagation()


    const dialogRef = this.dialog.open(ConfirmationDialogForm, {
      data: {
        contentTemplate: this.confirmationContentTemplate,
        contentContext: {item}
      },
      minWidth: "350px"
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result for confirmation ${JSON.stringify(result)}`);
      if (result) {
        const selectedCategory = this.passDataSelectionService.firstSelectedCategory();
        if (selectedCategory) {
          this.passDataCRUDService.deletePassNote(selectedCategory, item);
        }
      }
    })
  }
}
