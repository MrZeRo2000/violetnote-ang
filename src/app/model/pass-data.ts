import {PassCategory} from './pass-category';
import {PassNote} from './pass-note';

export class PassData {
  passCategoryList: Array<PassCategory>;
  passNoteList: Array<PassNote>;

  constructor(data: PassData) {
    this.passCategoryList = data.passCategoryList as Array<PassCategory>;
    this.passNoteList = data.passNoteList as Array<PassNote>;
  }
}
