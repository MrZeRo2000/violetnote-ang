import {PassNote} from './pass-note';

export class PassNoteExport {
  public category: string;
  public system: string;
  public user: string;
  public password: string;
  public url: string;
  public info: string;

  constructor(category: string, passNote: PassNote) {
    this.category = category;
    this.system = passNote.system;
    this.user = passNote.user;
    this.password = passNote.password;
    this.url = passNote.url;
    this.info = passNote.info;
  }
}
