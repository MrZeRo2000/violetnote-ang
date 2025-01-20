import { Component, OnInit } from '@angular/core';
import {AppInfoService} from '../services/app-info.service';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-app-info',
    templateUrl: './app-info.component.html',
    styleUrls: ['./app-info.component.scss'],
    standalone: false
})
export class AppInfoComponent implements OnInit {
  version = environment.VERSION;
  appVersion: string = null;

  constructor(private appInfoService: AppInfoService) {
    appInfoService.appInfo.subscribe(value => {
      this.appVersion = value?.version;
    })
  }

  ngOnInit(): void {
  }

}
