import { Component, OnInit } from '@angular/core';
import {PassDataReaderService} from './pass-data-reader.service';
import {PassData} from './pass-data';
import {PassCategory} from './pass-category';
import {AuthService} from './auth.service';
import {PassDataService} from './pass-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'VioletNote';
  passData: PassData;
  selectedPassCategory: PassCategory;

  constructor(
    public passDataService: PassDataService,
    private passDataReaderService: PassDataReaderService,
  ) {}

  ngOnInit() {
    console.log('On Init!');
    const o = this.passDataReaderService.getPassDataJSON('123');
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
