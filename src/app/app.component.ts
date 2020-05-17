import { Component, OnInit } from '@angular/core';
import {PassDataService} from './services/pass-data.service';
import {environment} from '../environments/environment';
import {AppConfigService} from './app-config/app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'VioletNote';
  version = environment.VERSION;

  isAppConfigured(): boolean {
    return !this.appConfigService.getConfigError();
  }

  constructor(private appConfigService: AppConfigService, public passDataService: PassDataService) {}

  ngOnInit() {}
}
