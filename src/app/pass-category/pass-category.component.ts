import {Component, OnDestroy, OnInit} from '@angular/core';
import {OperationMode, PassDataService} from '../services/pass-data.service';
import {PassData} from '../model/pass-data';
import {PassCategory} from '../model/pass-category';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-pass-category',
  templateUrl: './pass-category.component.html',
  styleUrls: ['./pass-category.component.scss']
})
export class PassCategoryComponent implements OnInit, OnDestroy {
  passData: PassData;
  selectedPassCategory: PassCategory;
  editMode = false;

  private passDataSubscription: Subscription;
  private passCategorySubscription: Subscription;
  private operationModeSubscription: Subscription;

  constructor(private passDataService: PassDataService) {
    this.passDataSubscription =
      passDataService.currentPassData.subscribe((passData) => this.passData = passData);
    this.passCategorySubscription =
      passDataService.currentPassCategory.subscribe((passCategory) => this.selectedPassCategory = passCategory);
    this.operationModeSubscription =
      passDataService.currentOperationMode.subscribe(value => this.editMode = value === OperationMode.OM_EDIT);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.passDataSubscription.unsubscribe();
    this.passCategorySubscription.unsubscribe();
    this.operationModeSubscription.unsubscribe();
  }

  onPassCategoryClick(event, passCategory) {
    event.preventDefault();
    this.passDataService.setSelectedPassCategory(passCategory);
  }

}
