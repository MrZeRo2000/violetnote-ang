import {PassData} from './pass-data';
import {PassDataPersist} from './pass-data-persist';

export class PassDataPersistRequest {
  private fileName: string;
  private password: string;
  private passData: PassDataPersist;

  constructor(fileName: string, password: string, passData: PassData) {
    this.fileName = fileName;
    this.password = password;
    this.passData = PassDataPersist.fromPassData(passData);
  }
}
