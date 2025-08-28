import {Component, inject, ViewChild} from '@angular/core';
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
export class PassDataSearchNoteList {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly dialog = inject(MatDialog);
  private passDataSearchService = inject(PassDataSearchService)

  displayedColumns: string[] = ['category', 'system', 'user', 'url'];

  public dataSource: MatTableDataSource<PassDataSearchResult> = new MatTableDataSource<PassDataSearchResult>();
  public searchResultAction$ = this.passDataSearchService.searchResultAction$

  getDataSource(data: PassDataSearchResult[] | null): MatTableDataSource<PassDataSearchResult> {
    console.log('Getting dataSource')
    const result: MatTableDataSource<PassDataSearchResult> = new MatTableDataSource<PassDataSearchResult>()
    /*
    if(data) {
      result.data = data
      result.sort = this.sort
      result.paginator = this.paginator
    }

     */
    return result;
  }

  data$ = this.passDataSearchService.searchResultAction$.pipe(
    tap(v => {
      if (v) {
        this.dataSource.data = v
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  )

  onRowClicked(row: PassDataSearchResult) {
    console.log(`Clicked: ${JSON.stringify(row)}`);
    this.dialog.open(PassDataNoteViewForm, {
      data: row.passNote,
      minWidth: "450px"
    })
  }


}
