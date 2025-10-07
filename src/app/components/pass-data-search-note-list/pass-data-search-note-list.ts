import {AfterViewInit, Component, inject, signal, TemplateRef, ViewChild} from '@angular/core';
import { PassDataSearchService } from "../../services/pass-data-search-service";
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {PassDataSearchResult} from '../../models/pass-data';
import {tap} from 'rxjs';
import {PassDataNoteViewForm} from '../pass-data-note-view-form/pass-data-note-view-form';
import {MatDialog} from '@angular/material/dialog';
import {AsyncPipe} from '@angular/common';
import {CopyUserPasswordPanel} from '../copy-user-password-panel/copy-user-password-panel';
import {MatIconButton} from '@angular/material/button';
import {PassDataService} from '../../services/pass-data-service';
import {MatIcon} from '@angular/material/icon';
import {PassDataNoteEditForm} from '../pass-data-note-edit-form/pass-data-note-edit-form';
import {PassDataCRUDService} from '../../services/pass-data-crud-service';
import {ConfirmationDialogForm} from '../confirmation-dialog-form/confirmation-dialog-form';
import {UrlUtils} from '../../utils/url-utils';
import {PaginatorService} from '../../services/paginator-service';
import {ScreenService} from '../../services/screen-service';

@Component({
  selector: 'app-pass-data-search-note-list',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    AsyncPipe,
    CopyUserPasswordPanel,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './pass-data-search-note-list.html',
  styleUrl: './pass-data-search-note-list.scss'
})
export class PassDataSearchNoteList implements AfterViewInit {
  @ViewChild('confirmationContentTemplate') confirmationContentTemplate?: TemplateRef<PassDataSearchResult>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly dialog = inject(MatDialog);
  private passDataService = inject(PassDataService)
  private passDataSearchService = inject(PassDataSearchService)
  private passDataCRUDService = inject(PassDataCRUDService)
  private paginatorService = inject(PaginatorService)
  private screenService = inject(ScreenService);

  passDataModeReadOnly = this.passDataService.passDataModeReadOnlySignal

  UrlUtils = UrlUtils
  smallScreen$ = this.screenService.smallScreen$

  displayedColumns: string[] = ['categoryName', 'system', 'user', 'url', 'actions'];

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
    this.paginatorService.setupPaginator(this.paginator);
  }

  onRowClicked(row: PassDataSearchResult) {
    console.log(`Clicked: ${JSON.stringify(row)}`);
    this.dialog.open(PassDataNoteViewForm, {
      data: row.passNote,
      minWidth: "450px"
    })
  }

  onPageChange(event: PageEvent) {
    this.paginatorService.pageSize = event.pageSize
  }

  onEditClick(event: any, item: PassDataSearchResult) {
    event.stopPropagation();

    const dialogRef = this.dialog.open(PassDataNoteEditForm, {
      data: item.passNote,
      minWidth: "650px",
    })

    dialogRef.afterClosed().subscribe(result => {
      const category = this.passDataService
        .getPassDataValue()?.
        categoryList?.
        find(v => v.categoryName === item.categoryName)
      if (result && category) {
        this.passDataCRUDService.updatePassNote(category, item.passNote, result);
        this.passDataSearchService.searchValueSublect.next(this.passDataSearchService.searchValueSublect.value)
      }
    })

  }

  onDeleteClick(event: any, item: PassDataSearchResult) {
    event.stopPropagation()

    const dialogRef = this.dialog.open(ConfirmationDialogForm, {
      data: {
        contentTemplate: this.confirmationContentTemplate,
        contentContext: {item}
      },
      minWidth: "350px"
    })

    dialogRef.afterClosed().subscribe(result => {
      const category = this.passDataService
        .getPassDataValue()?.
        categoryList?.
        find(v => v.categoryName === item.categoryName)
      if (result && category) {
        this.passDataCRUDService.deletePassNote(category, item.passNote);
        this.passDataSearchService.searchValueSublect.next(this.passDataSearchService.searchValueSublect.value)
      }
    })
  }

}
