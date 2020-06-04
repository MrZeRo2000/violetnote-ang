import {PassData} from './pass-data';

export class PassDataPersistRequest {
  constructor(public fileName: string, public password: string, public passData: PassData) { }
}
