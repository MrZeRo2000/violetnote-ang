import {PassCategory} from './pass-category';
import {PassNote} from './pass-note';

export class PassData {
  categoryList: Array<PassCategory>;
  passNoteList: Array<PassNote>;

  public static createNew(): PassData {
    const newPassData = new PassData(null);
    newPassData.categoryList.push(new PassCategory('New category'));
    return newPassData;
  }

  constructor(data: PassData) {
    this.categoryList = data ? data.categoryList as Array<PassCategory> : [];
    this.calcNoteList();
  }

  public calcNoteList(): void {
    if (!this.passNoteList) {
      this.passNoteList = [];
    }
    this.categoryList.forEach(value => this.passNoteList.push(...value.noteList));
  }
}
