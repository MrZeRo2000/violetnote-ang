import { Component, OnInit } from '@angular/core';
import {PassDataService} from './services/pass-data.service';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'VioletNote';
  version = environment.VERSION;

  constructor(public passDataService: PassDataService) {}

  ngOnInit() {}
}
