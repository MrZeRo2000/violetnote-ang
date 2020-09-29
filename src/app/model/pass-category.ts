import {PassNote} from './pass-note';

export class PassCategory {

  public noteList: Array<PassNote> = [];

  constructor(public categoryName: string) { }
}
