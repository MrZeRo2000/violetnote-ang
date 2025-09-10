import {inject, Injectable} from '@angular/core';
import {PassDataService} from './pass-data-service';
import {PassCategory} from '../models/pass-data';

@Injectable({
  providedIn: 'root'
})
export class PassDataCRUDService {
  private passDataService = inject(PassDataService);

  updatePassCategoryName(value: PassCategory, newValue: PassCategory): void {
    const passData = this.passDataService.getPassDataValue();
    const updateIndex = passData?.categoryList.indexOf(value)
    if (passData && (updateIndex !== undefined) && (updateIndex !== -1)) {
      console.log(`Updating ${JSON.stringify(value)} to ${JSON.stringify(newValue)}`)
      passData.categoryList[updateIndex] = newValue;

      this.passDataService.update(passData)
    }
  }

  addPassCategory(newValue: PassCategory): void {
    const passData = this.passDataService.getPassDataValue();
    if (passData) {
      console.log(`Adding ${JSON.stringify(newValue)}`)
      passData.categoryList.push(newValue);

      this.passDataService.update(passData)
    }
  }

  deletePassCategory(value: PassCategory): void {
    const passData = this.passDataService.getPassDataValue();
    if (passData) {
      passData.categoryList.splice(passData.categoryList.indexOf(value), 1);
      this.passDataService.update(passData)
    }
  }

  movePassCategory(previousIndex: number, currentIndex: number): void {
    const passData = this.passDataService.getPassDataValue();
    if (passData) {
      passData.categoryList.splice(currentIndex, 0, passData.categoryList.splice(previousIndex, 1)[0]);
      this.passDataService.update(passData)
    }
  }
}
