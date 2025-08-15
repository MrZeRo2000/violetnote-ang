import {AfterViewInit, Component, computed, inject, ViewChild} from '@angular/core';
import {PassDataSelectionService} from '../../services/pass-data-selection-service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {PassNote} from '../../models/pass-data';

@Component({
  selector: 'app-pass-data-note-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './pass-data-note-list.html',
  styleUrl: './pass-data-note-list.scss'
})
export class PassDataNoteList implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private passDataSelectionService = inject(PassDataSelectionService)

  selectedNotes = this.passDataSelectionService.selectedNotesSignal
  dataSource = computed(() => {
    const currentSelectedNotes = this.selectedNotes();
    const newDataSource = new MatTableDataSource<PassNote>(currentSelectedNotes)
    newDataSource.sort = this.sort
    newDataSource.paginator = this.paginator
    return newDataSource
  })

  displayedColumns: string[] = ['system', 'user', 'url'];

  ngAfterViewInit(): void {
    // Initial setup for paginator and sort.
    // The computed signal will handle updates.
    this.dataSource().paginator = this.paginator;
    this.dataSource().sort = this.sort;
  }
}
