import {PassCategory} from './pass-category';
import {PassNote} from './pass-note';

export class PassData {
  passCategoryList: Array<PassCategory>;
  passNoteList: Array<PassNote>;

  public static createNew(): PassData {
    const newPassData = new PassData(null);
    newPassData.passCategoryList.push(new PassCategory('New category'));
    return newPassData;
  }

  constructor(data: PassData) {
    this.passCategoryList = data ? data.passCategoryList as Array<PassCategory> : [];
    this.passNoteList = data ? data.passNoteList as Array<PassNote> : [];
  }
}
