import {Component, inject} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from "@angular/material/tooltip";
import {PassDataFileService} from '../../services/pass-data-file-service';
import {combineLatest, map} from 'rxjs';
import {AppConfigService} from '../../services/app-config-service';
import {AsyncPipe} from '@angular/common';
import {Router } from '@angular/router';
import packageJson from '../../../../package.json';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    AsyncPipe,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  router = inject(Router)
  appConfigService = inject(AppConfigService)
  passDataFileService = inject(PassDataFileService)

  readonly version?: string = packageJson.version;

  data$ = combineLatest([
    this.appConfigService.getAppInfo(),
    this.passDataFileService.getPassDataFileInfo()
    ]
  ).pipe(
    map(v => {
      return {
        appInfo: v[0],
        passDataFileInfo: v[1]
      }
    })
  )

  onSettingsClick() {
    this.router.navigate([""], {
      queryParams: {
        'configurationRequired': true
      }
    })
  }
}
