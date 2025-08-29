import {AfterViewInit, Component, inject, signal, ViewChild} from '@angular/core';
import { PassDataSearchService } from "../../services/pass-data-search-service";
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {PassDataSearchResult} from '../../models/pass-data';
import {tap} from 'rxjs';
import {PassDataNoteViewForm} from '../pass-data-note-view-form/pass-data-note-view-form';
import {MatDialog} from '@angular/material/dialog';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-pass-data-search-note-list',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    AsyncPipe,
  ],
  templateUrl: './pass-data-search-note-list.html',
  styleUrl: './pass-data-search-note-list.scss'
})
export class PassDataSearchNoteList implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly dialog = inject(MatDialog);
  private passDataSearchService = inject(PassDataSearchService)

  displayedColumns: string[] = ['categoryName', 'system', 'user', 'url'];

  private sortDataAccessor(item: PassDataSearchResult, headerId: string): string  {
      // Check if the headerId matches the dictionary property
      if (headerId === 'system') {
      // Return the specific property you want to sort by
      return item.passNote.system;
    } else if (headerId === 'user') {
      return item.passNote.user;
    } else {
      return item[headerId as keyof PassDataSearchResult] as string;
    }
  };

  private dataSourceSignal = signal<MatTableDataSource<PassDataSearchResult>>(new MatTableDataSource([] as  PassDataSearchResult[]))
  dataSource = this.dataSourceSignal.asReadonly()

  public data$ = this.passDataSearchService.searchResultAction$.pipe(
    tap(data => {
      console.log(`data$: ${JSON.stringify(data)}`);
      if(data) {
        const newDataSource = new MatTableDataSource<PassDataSearchResult>(data);
        newDataSource.sortingDataAccessor = this.sortDataAccessor
        newDataSource.paginator = this.paginator
        newDataSource.sort = this.sort
        this.dataSourceSignal.set(newDataSource)
      }
    })
  )

  ngAfterViewInit(): void {
    // Initial setup for paginator and sort.
    // The computed signal will handle updates.
    this.dataSourceSignal().sortingDataAccessor = this.sortDataAccessor
    this.dataSourceSignal().paginator = this.paginator;
    this.dataSourceSignal().sort = this.sort;
  }

  onRowClicked(row: PassDataSearchResult) {
    console.log(`Clicked: ${JSON.stringify(row)}`);
    this.dialog.open(PassDataNoteViewForm, {
      data: row.passNote,
      minWidth: "450px"
    })
  }


}
