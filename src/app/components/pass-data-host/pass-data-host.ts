import { Component } from '@angular/core';
import {PassDataCategoryList} from '../pass-data-category-list/pass-data-category-list';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-pass-data-host',
  imports: [
    MatSidenavModule,
    PassDataCategoryList,

  ],
  templateUrl: './pass-data-host.html',
  styleUrl: './pass-data-host.scss'
})
export class PassDataHost {

}
