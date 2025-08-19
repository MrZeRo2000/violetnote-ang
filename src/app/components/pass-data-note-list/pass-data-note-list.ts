import {AfterViewInit, Component, computed, inject, ViewChild} from '@angular/core';
import {PassDataSelectionService} from '../../services/pass-data-selection-service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {PassNote} from '../../models/pass-data';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {PassDataService} from '../../services/pass-data-service';

@Component({
  selector: 'app-pass-data-note-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './pass-data-note-list.html',
  styleUrl: './pass-data-note-list.scss'
})
export class PassDataNoteList implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private passDataSelectionService = inject(PassDataSelectionService)
  private passDataService = inject(PassDataService)

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
    console.log(`Clicked: ${row}`);
  }
}
