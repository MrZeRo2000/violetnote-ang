import {inject, Injectable} from '@angular/core';
import {AppInfo} from '../models/app';
import {delay, Observable, shareReplay, tap} from 'rxjs';
import {DataSource} from './data-source';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private dataSource = inject(DataSource);
  appInfo$ = this.getAppInfo();

  getAppInfo(): Observable<AppInfo> {
    if (!this.appInfo$) {
      return this.dataSource.getResponseData<AppInfo>("/app-info").pipe(
        tap(() => console.log(`Loaded appInfo`)),
        delay(0),
        shareReplay(1)
      );
    } else {
      return this.appInfo$;
    }
  }
}
