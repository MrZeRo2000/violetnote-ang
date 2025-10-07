import {computed, inject, Injectable, signal} from '@angular/core';
import {PassDataService} from './pass-data-service';
import {PassCategory, PassData, PassNote} from '../models/pass-data';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class PassDataSelectionService {
  private passDataService = inject(PassDataService);

  private passData: PassData | null = null;

  private selectedCategories = new Set<PassCategory>()
  readonly selectedCategoriesSignal = signal(new Set<PassCategory>())
  readonly firstSelectedCategory = computed(() =>
    this.selectedCategoriesSignal().size > 0 ? [...this.selectedCategoriesSignal()][0] : null
  )

  private selectedNotes = new Array<PassNote>()
  readonly selectedNotesSignal = signal(new Array<PassNote>())

  selectedCategoryName = signal<string | null>(null)

  constructor() {
    this.passDataService.getPassData().pipe(takeUntilDestroyed()).subscribe(v => {
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
