import {ChangeDetectionStrategy, Component, inject, TemplateRef, ViewChild} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {PassDataService} from '../../services/pass-data-service';
import {map} from 'rxjs';
import {PassDataSelectionService} from '../../services/pass-data-selection-service';
import {AsyncPipe, NgClass} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatLineModule} from '@angular/material/core';
import {PassCategory} from '../../models/pass-data';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {PassDataCategoryEditForm} from '../pass-data-category-edit-form/pass-data-category-edit-form';
import {PassDataCRUDService} from '../../services/pass-data-crud-service';
import {ConfirmationDialogForm} from '../confirmation-dialog-form/confirmation-dialog-form';

@Component({
  selector: 'app-pass-data-category-list',
  imports: [
    MatListModule,
    MatButtonModule,
    MatLineModule,
    MatIconModule,
    AsyncPipe,
    NgClass,
  ],
  templateUrl: './pass-data-category-list.html',
  styleUrl: './pass-data-category-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PassDataCategoryList {
  @ViewChild('confirmationContentTemplate') confirmationContentTemplate?: TemplateRef<any>;

  private passDataService = inject(PassDataService);
  private passDataSelectionService = inject(PassDataSelectionService)
  private passDataCRUDService = inject(PassDataCRUDService)
  private readonly dialog = inject(MatDialog);

  passDataModeReadOnly = this.passDataService.passDataModeReadOnlySignal
  selectedCategories = this.passDataSelectionService.selectedCategoriesSignal

  data$ = this.passDataService.getPassData().pipe(
    map(v => v === null? [] : v.categoryList)
  )



  onListItemClick(item: PassCategory) {
    this.passDataSelectionService.selectCategory(item);
  }

  onEditClick(event: any, item: PassCategory) {
    event.stopPropagation()
    const dialogRef = this.dialog.open(PassDataCategoryEditForm, {
      data: item,
      minWidth: "450px"
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.passDataSelectionService.selectedCategoryName.set(result.categoryName)
        this.passDataCRUDService.updatePassCategoryName(item, result);
      }
    })
  }

  onDeleteClick(event: any, item: PassCategory) {
    event.stopPropagation()
    console.log(`Deleting ${JSON.stringify(item)}`);


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
        this.passDataSelectionService.selectedCategoryName.set(null)
        this.passDataCRUDService.deletePassCategory(item);
      }
    })

  }

  onAddClick(event: any) {
    event.stopPropagation()
    console.log(`Adding`);

    const dialogRef = this.dialog.open(PassDataCategoryEditForm, {
      data: {},
      minWidth: "450px"
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.passDataSelectionService.selectedCategoryName.set(result.categoryName)
        this.passDataCRUDService.addPassCategory(result);
      }
    })
  }
}
