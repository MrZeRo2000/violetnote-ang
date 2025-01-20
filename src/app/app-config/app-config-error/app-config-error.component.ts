import { Component, OnInit } from '@angular/core';
import {AppConfigService} from '../app-config.service';

@Component({
    selector: 'app-app-config-error',
    templateUrl: './app-config-error.component.html',
    styleUrls: ['./app-config-error.component.scss'],
    standalone: false
})
export class AppConfigErrorComponent implements OnInit {

  getConfigError(): string {
    return this.appConfigService.getConfigError();
  }

  constructor(private appConfigService: AppConfigService) { }

  ngOnInit(): void {
  }

}
