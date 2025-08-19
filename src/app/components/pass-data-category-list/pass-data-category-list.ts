import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {PassDataService} from '../../services/pass-data-service';
import {map} from 'rxjs';
import {PassDataSelectionService} from '../../services/pass-data-selection-service';
import {AsyncPipe, NgClass} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatLineModule} from '@angular/material/core';
import {PassCategory} from '../../models/pass-data';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-pass-data-category-list',
  imports: [
    MatListModule,
    MatButtonModule,
    MatLineModule,
    MatIconModule,
    AsyncPipe,
    NgClass
  ],
  templateUrl: './pass-data-category-list.html',
  styleUrl: './pass-data-category-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PassDataCategoryList {
  private passDataService = inject(PassDataService);
  private passDataSelectionService = inject(PassDataSelectionService)

  passDataModeReadOnly = this.passDataService.passDataModeReadOnlySignal
  selectedCategories = this.passDataSelectionService.selectedCategoriesSignal

  data$ = this.passDataService.getPassData().pipe(
    map(v => v === null? [] : v.categoryList)
  )

  onListItemClick(item: PassCategory) {
    this.passDataSelectionService.selectCategory(item);
  }
}
