import {Component, inject} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from "@angular/material/tooltip";
import {PassDataFileService} from '../../services/pass-data-file-service';
import {
  combineLatest,
  map,
} from 'rxjs';
import {AppConfigService} from '../../services/app-config-service';
import {AsyncPipe, NgClass} from '@angular/common';
import {toSignal} from '@angular/core/rxjs-interop';
import {Router} from '@angular/router';
import packageJson from '../../../../package.json';
import {PassDataService} from '../../services/pass-data-service';
import {ScreenService} from '../../services/screen-service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {PassDataMode} from '../../models/pass-data';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {SearchInput} from '../search-input/search-input';
import {PassDataSaveButton} from '../pass-data-save-button/pass-data-save-button';
import {RouterEventsService} from '../../services/router-events-service';
import {MatChip} from '@angular/material/chips';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    SearchInput,
    PassDataSaveButton,
    MatChip,
    NgClass,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  readonly router = inject(Router)
  readonly appConfigService = inject(AppConfigService)
  private readonly routerEventsService = inject(RouterEventsService)
  readonly passDataService = inject(PassDataService)
  readonly passDataFileService = inject(PassDataFileService)
  readonly screenService = inject(ScreenService);

  PassDataMode = PassDataMode

  readonly data = toSignal(
    combineLatest([
      this.appConfigService.getAppInfo(),
      this.passDataFileService.getPassDataFileInfo(),
      this.passDataService.getPassData(),
      ]
    ).pipe(
      map(v => {
        return {
          appInfo: v[0],
          passDataFileInfo: v[1],
          passData: v[2],
        }
      })
    )
  )

  readonly mainRouteSignal = this.routerEventsService.mainRouteSignal

  onSettingsClick() {
    this.router.navigate([""], {
      queryParams: {
        'configurationRequired': true
      }
    })
  }

  onLogoutClick() {
    this.router.navigate([""])
  }
}
