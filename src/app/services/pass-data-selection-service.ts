import {inject, Injectable, OnDestroy, signal} from '@angular/core';
import {PassDataService} from './pass-data-service';
import {Subscription} from 'rxjs';
import {PassCategory, PassData, PassNote} from '../models/pass-data';

@Injectable({
  providedIn: 'root'
})
export class PassDataSelectionService implements OnDestroy {
  private passDataService = inject(PassDataService);
  private passDataServiceSubscription: Subscription

  private passData: PassData | null = null;

  private selectedCategories = new Set<PassCategory>()
  readonly selectedCategoriesSignal = signal(new Set<PassCategory>())

  private selectedNotes = new Array<PassNote>()
  readonly selectedNotesSignal = signal(new Array<PassNote>())

  selectedCategoryName = signal<string | null>(null)

  constructor() {
    this.passDataServiceSubscription = this.passDataService.getPassData().subscribe(v => {
      this.passData = v

      // restore selected category after update
      if (v) {
        if (this.selectedCategoryName()) {
          const selectedCategory = v.categoryList.find(v => v.categoryName === this.selectedCategoryName())
          this.selectCategory(selectedCategory ? selectedCategory : v.categoryList[0])
        } else {
          this.selectCategory(v.categoryList[0])
        }
      } else {
        this.selectCategory(null)
      }
      this.selectedCategoryName.set(null)

    })
  }

  ngOnDestroy(): void {
    this.passDataServiceSubscription?.unsubscribe()
  }

  selectCategory(category: PassCategory | null): void {
    if (category) {
      this.selectedCategories = new Set([category])
    } else {
      this.selectedCategories = new Set([])
    }
    this.selectedCategoriesSignal.set(this.selectedCategories);
    this.selectNotes(
      this.passData?.categoryList?.filter(v => this.selectedCategories.has(v)).flatMap(v => v.noteList) || []
    )
  }

  selectNotes(notes: Array<PassNote>): void {
    this.selectedNotes = notes
    this.selectedNotesSignal.set(this.selectedNotes);
  }

}
