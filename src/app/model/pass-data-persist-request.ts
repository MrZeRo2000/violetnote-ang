import {PassData} from './pass-data';

export class PassDataPersistRequest {
  private fileName: string;
  private password: string;
  private passData: any = {};

  constructor(fileName: string, password: string, passData: PassData) {
    this.fileName = fileName;
    this.password = password;
    Object.assign(this.passData, passData);
    delete this.passData.passNoteList;
  }
}
