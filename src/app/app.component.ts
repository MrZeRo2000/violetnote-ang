import { Component, OnInit } from '@angular/core';
import {PassDataService} from './services/pass-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'VioletNote';

  constructor(public passDataService: PassDataService) {}

  ngOnInit() {}
}
