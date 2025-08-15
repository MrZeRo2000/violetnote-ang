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

  constructor() {
    this.passDataServiceSubscription = this.passDataService.getPassData().subscribe(v => {
      this.passData = v
      this.selectCategory(v? v.categoryList[0] : null)
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
