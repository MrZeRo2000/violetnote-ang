import { Component, OnInit } from '@angular/core';
import {PassDataService} from './pass-data.service';
import {PassData} from './pass-data';
import {PassCategory} from './pass-category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'the app 1';
  passData: PassData;
  selectedPassCategory: PassCategory;

  constructor(private passDataService: PassDataService) {}

  ngOnInit() {
    console.log('On Init!');
    const o = this.passDataService.getPassDataJSON('123');
    o.subscribe((data: PassData) => {
      this.passData = data;
      console.log('read pass data: ' + this.passData.passCategoryList.join(','));
      this.selectedPassCategory = this.passData.passCategoryList[0];
    });
  }

  passCategoryListClick(event, passCategory) {
    this.selectedPassCategory = passCategory;
  }

}
