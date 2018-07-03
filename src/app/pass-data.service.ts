import { Injectable } from '@angular/core';
import {PassData} from './pass-data';
import {PassCategory} from './pass-category';
import {PassNote} from './pass-note';

@Injectable({
  providedIn: 'root'
})
export class PassDataService {
  private passData: PassData;
  private selectedPassCategory: PassCategory;

  constructor() {
    this.clearPassData();
  }

  public setPassData(passData) {
    this.passData = passData;
    this.setSelectedPassCategory(this.passData.passCategoryList[0]);
  }

  public clearPassData() {
    this.passData = null;
    this.selectedPassCategory = null;
  }

  public isPassData() {
    return this.passData != null;
  }

  public getSelectedPassCategory() {
    return this.selectedPassCategory;
  }

  public setSelectedPassCategory(passCategory: PassCategory) {
    this.selectedPassCategory = passCategory;
  }

  public getPassData() {
    return this.passData;
  }

  public getPassNotes() {
    const result = Array<PassNote>();

    for (const note of this.getPassData().passNoteList) {
      if (note.passCategory.categoryName === this.selectedPassCategory.categoryName) {
        result.push(note);
      }
    }

    return result;
  }
}
