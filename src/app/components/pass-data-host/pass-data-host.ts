import { Component } from '@angular/core';
import {PassDataCategoryList} from '../pass-data-category-list/pass-data-category-list';

@Component({
  selector: 'app-pass-data-host',
  imports: [
    PassDataCategoryList
  ],
  templateUrl: './pass-data-host.html',
  styleUrl: './pass-data-host.scss'
})
export class PassDataHost {

}
