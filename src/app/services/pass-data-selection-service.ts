import {inject, Injectable, OnDestroy, signal} from '@angular/core';
import {PassDataService} from './pass-data-service';
import {Subscription} from 'rxjs';
import {PassCategory, PassNote} from '../models/pass-data';

@Injectable({
  providedIn: 'root'
})
export class PassDataSelectionService implements OnDestroy {
  private passDataService = inject(PassDataService);
  private passDataServiceSubscription: Subscription

  private selectedCategories = new Set<PassCategory>()
  readonly selectedCategoriesSignal = signal(new Set<PassCategory>())

  private selectedNotes = new Set<PassNote>()
  readonly selectedNotesSignal = signal(new Set<PassNote>())

  constructor() {
    this.passDataServiceSubscription = this.passDataService.getPassData().subscribe(v => {
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
    this.selectNotes([])
  }

  selectNotes(notes: Array<PassNote>): void {
    this.selectedNotes = new Set(notes)
    this.selectedNotesSignal.set(this.selectedNotes);
  }

}
