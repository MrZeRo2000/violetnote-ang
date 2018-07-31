import {EventEmitter, Injectable} from '@angular/core';
import {PassData} from '../model/pass-data';
import {PassCategory} from '../model/pass-category';
import {PassNote} from '../model/pass-note';

@Injectable({
  providedIn: 'root'
})
export class PassDataService {
  private passData: PassData = null;
  private selectedPassCategory: PassCategory = null;

  private passDataUpdated: EventEmitter<PassData> = new EventEmitter<PassData>();
  private passCategoryUpdated: EventEmitter<PassCategory> = new EventEmitter<PassCategory>();

  constructor() {}

  public getPassDataUpdatedEvent(): EventEmitter<PassData> {
    return this.passDataUpdated;
  }

  public getPassCategoryUpdatedEvent(): EventEmitter<PassCategory> {
    return this.passCategoryUpdated;
  }

  public setPassData(passData) {
    this.passData = new PassData(passData);
    this.passDataUpdated.emit(passData);
    this.setSelectedPassCategory(this.passData.passCategoryList[0]);
  }

  public clearPassData() {
    this.passData = null;
    this.setSelectedPassCategory(null);
  }

  public isPassData() {
    return this.passData != null;
  }

  public getSelectedPassCategory() {
    return this.selectedPassCategory;
  }

  public setSelectedPassCategory(passCategory: PassCategory) {
    this.selectedPassCategory = passCategory;
    this.passCategoryUpdated.emit(passCategory);
  }

  public getPassData() {
    return this.passData;
  }

  public getPassNotes() {
    return this.getPassData().passNoteList.filter(
      (note) => note.passCategory.categoryName === this.selectedPassCategory.categoryName
    );
  }

  public getSearchPassNotes(searchString: string): Array<PassNote>  {
    if ((searchString === undefined) || (searchString == null)) {
      return this.getPassData().passNoteList;
    } else {
      const searchExp = new RegExp(`.*${searchString}.*`, 'i');

      return this.getPassData().passNoteList.filter(
        (note) => searchExp.test(note.system) || searchExp.test(note.user)
      );
    }
  }
}
