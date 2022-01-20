import { Injectable } from '@angular/core';
import {RestDataSourceService} from '../data-source/rest-data-source.service';
import {MessagesService} from '../messages/messages.service';
import {BehaviorSubject} from 'rxjs';
import {AppInfo} from '../model/app-info';

@Injectable({
  providedIn: 'root'
})
export class AppInfoService {
  private static readonly PATH = '/app-info'

  appInfo: BehaviorSubject<AppInfo> = new BehaviorSubject<AppInfo>(null);

  constructor(private dataSource: RestDataSourceService, private messagesService: MessagesService) {
    this.dataSource.getResponse(AppInfoService.PATH).subscribe(data => {
      console.log('AppInfoService response');
      this.appInfo.next(data.body as AppInfo);
    }, error => {
      console.error(`Unable to get app version: ${error?.error?.error}`)
    });
  }
}
