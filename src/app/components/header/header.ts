import {Component, inject, OnInit} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from "@angular/material/tooltip";
import {PassDataFileService} from '../../services/pass-data-file-service';
import {
  combineLatest,
  map,
  startWith,
  tap,
  of,
  switchMap,
  Observable,
  debounceTime, distinctUntilChanged
} from 'rxjs';
import {AppConfigService} from '../../services/app-config-service';
import {AsyncPipe} from '@angular/common';
import {Router } from '@angular/router';
import packageJson from '../../../../package.json';
import {PassDataService} from '../../services/pass-data-service';
import {ScreenService} from '../../services/screen-service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {PassDataMode} from '../../models/pass-data';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

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
    MatAutocompleteModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  router = inject(Router)
  fb = inject(FormBuilder)

  appConfigService = inject(AppConfigService)
  passDataService = inject(PassDataService)
  passDataFileService = inject(PassDataFileService)
  screenService = inject(ScreenService);

  readonly version?: string = packageJson.version;

  PassDataMode = PassDataMode

  data$ = combineLatest([
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
    }),
    tap(() => {
      console.log(`Mode: ${this.passDataService.passDataModeSignal()}`)
    })
  )

  searchForm = this.fb.group({
    searchControl: ['', Validators.min(2)],
  })

  searchOptions$: Observable<Array<string>> | undefined;

  ngOnInit() {
    this.searchOptions$ = this.searchForm.valueChanges.pipe(
      startWith(''),
      tap(v => {
        console.log(`Search action: ${JSON.stringify(v)}`);
      }),
      map(v => (typeof v === 'object' && v !== null && 'searchControl' in v) ? v.searchControl as string : ''),
      map(v => v ? v : ' '),
      tap(v => {
        console.log(`Search action after map: ${v}`);
      }),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(v => {
        if (v.length < 2) {
          return of([])
        } else {
          return this.passDataService.searchStrings(v)
        }
      }),
      tap(v => {
        console.log(`Search options: ${JSON.stringify(v)}`);
      })
    )
  }

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
