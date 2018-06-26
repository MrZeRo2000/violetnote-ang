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
      setTimeout( () => {
        this.passData = data;
        this.selectedPassCategory = this.passData.passCategoryList[0];
      }, 3000
    );
    });
  }

  passCategoryListClick(event, passCategory) {
    this.selectedPassCategory = passCategory;
  }

}
