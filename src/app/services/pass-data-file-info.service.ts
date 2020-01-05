import { Injectable } from '@angular/core';
import {PassDataFileInfo} from '../model/pass-data-file-info';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassDataFileInfoService {
  private passDataFileInfo: PassDataFileInfo = null;

  currentPassDataFileInfo: Subject<PassDataFileInfo> = new BehaviorSubject<PassDataFileInfo>(null);

  constructor(private http: HttpClient) { }

  public getPassDataFileInfo() {
    return this.passDataFileInfo;
  }

  public setPassDataFileInfo(passDataFileInfo: PassDataFileInfo) {
    this.passDataFileInfo = passDataFileInfo;
    this.currentPassDataFileInfo.next(passDataFileInfo);
  }

  public getDataReader() {
    return this.http.get(environment.passDataFileInfoUrl);
  }
}
