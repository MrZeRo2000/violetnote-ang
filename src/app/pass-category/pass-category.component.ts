import { Component, OnInit } from '@angular/core';
import {PassDataService} from '../services/pass-data.service';
import {PassData} from '../model/pass-data';
import {PassCategory} from '../model/pass-category';

@Component({
  selector: 'app-pass-category',
  templateUrl: './pass-category.component.html',
  styleUrls: ['./pass-category.component.scss']
})
export class PassCategoryComponent implements OnInit {
  passData: PassData;
  selectedPassCategory: PassCategory;

  constructor(private passDataService: PassDataService) {
    passDataService.currentPassData.subscribe((passData) => this.passData = passData);
    passDataService.currentPassCategory.subscribe((passCategory) => this.selectedPassCategory = passCategory);
  }

  ngOnInit() {
  }

  onPassCategoryClick(event, passCategory) {
    event.preventDefault();
    this.passDataService.setSelectedPassCategory(passCategory);
  }

}
