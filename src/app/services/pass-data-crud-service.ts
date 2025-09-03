import {inject, Injectable} from '@angular/core';
import {PassDataService} from './pass-data-service';
import {PassCategory} from '../models/pass-data';

@Injectable({
  providedIn: 'root'
})
export class PassDataCrudService {
  private passDataService = inject(PassDataService);
  updatePassCategoryName(value: PassCategory, newValue: PassCategory): void {
    const passData = this.passDataService.getPassDataValue();
    const updateIndex = passData?.categoryList.indexOf(value)
    if (passData && updateIndex && (updateIndex !== -1)) {
      console.log(`Updating ${value} to ${newValue}`)
      passData.categoryList[updateIndex] = newValue;

      this.passDataService.update(passData)
    }
  }
}
