import { Component, OnInit } from '@angular/core';
import {PassDataService} from '../services/pass-data.service';

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
    event.preventDefault();
    this.passDataService.setSelectedPassCategory(passCategory);
  }

}
