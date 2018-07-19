import {PassCategory} from './pass-category';
import {PassNote} from './pass-note';

export class PassData {
  passCategoryList: Array<PassCategory>;
  passNoteList: Array<PassNote>;

  constructor(data: any) {
    this.passCategoryList = data.passCategoryList;
    this.passNoteList = data.passNoteList;
  }
}
