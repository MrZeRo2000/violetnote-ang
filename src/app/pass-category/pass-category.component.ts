import { Component, OnInit } from '@angular/core';
import {PassDataService} from '../pass-data.service';

@Component({
  selector: 'app-pass-category',
  templateUrl: './pass-category.component.html',
  styleUrls: ['./pass-category.component.css']
})
export class PassCategoryComponent implements OnInit {

  constructor(public passDataService: PassDataService) { }

  ngOnInit() {
  }

  onPassCategoryClick(event, passCategory) {
    this.passDataService.setSelectedPassCategory(passCategory);
  }

}
