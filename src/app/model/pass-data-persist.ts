import {PassCategory} from './pass-category';
import {PassData} from './pass-data';

export class PassDataPersist {

  constructor(private categoryList: Array<PassCategory>) { }

  public static fromPassData(passData: PassData): PassDataPersist {
    return new PassDataPersist(passData.categoryList);
  }
}
