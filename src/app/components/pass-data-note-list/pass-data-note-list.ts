import {AfterViewInit, Component, computed, inject, ViewChild} from '@angular/core';
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
  ],
  templateUrl: './pass-data-note-list.html',
  styleUrl: './pass-data-note-list.scss'
})
export class PassDataNoteList implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private readonly passDataSelectionService = inject(PassDataSelectionService)
  private readonly passDataService = inject(PassDataService)
  private passDataCRUDService = inject(PassDataCRUDService)
  private readonly dialog = inject(MatDialog);

  passDataModeReadOnly = this.passDataService.passDataModeReadOnlySignal
  selectedNotes = this.passDataSelectionService.selectedNotesSignal
  dataSource = computed(() => {
    const currentSelectedNotes = this.selectedNotes();
    const newDataSource = new MatTableDataSource<PassNote>(currentSelectedNotes)
    newDataSource.sort = this.sort
    newDataSource.paginator = this.paginator
    return newDataSource
  })

  displayedColumns: string[] = ['system', 'user', 'url', 'actions'];

  ngAfterViewInit(): void {
    // Initial setup for paginator and sort.
    // The computed signal will handle updates.
    this.dataSource().paginator = this.paginator;
    this.dataSource().sort = this.sort;
  }

  onRowClicked(row: PassNote) {
    console.log(`Clicked: ${JSON.stringify(row)}`);
    this.dialog.open(PassDataNoteViewForm, {
      data: row,
      minWidth: "450px"
    })
  }

  onEditClick(event: any, item: PassNote) {
    event.stopPropagation();

    const dialogRef = this.dialog.open(PassDataNoteEditForm, {
      data: item,
      minWidth: "450px",
    })

    dialogRef.afterClosed().subscribe(result => {
      const selectedCategory = this.passDataSelectionService.firstSelectedCategory();
      if (result && selectedCategory) {
        this.passDataCRUDService.updatePassNote(selectedCategory, item, result);
      }
    })

  }
}
