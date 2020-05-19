import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {PassDataFileInfo} from '../model/pass-data-file-info';
import {RestDataSourceService} from '../data-source/rest-data-source.service';
import {HttpResponse} from '@angular/common/http';
import {PassDataFileRequest} from '../model/pass-data-file-request';

@Injectable({
  providedIn: 'root'
})
export class PassDataFileNameService {
  private readonly LOCAL_STORAGE_FILE_NAME_KEY = 'passDataFileName';

  private fileName: string;
  private loading = false;

  currentFileName: Subject<string> = new BehaviorSubject<string>(null);
  currentPassDataFileInfo: Subject<PassDataFileInfo> = new BehaviorSubject<PassDataFileInfo>(null);

  passDataFileInfo: PassDataFileInfo = null;

  constructor(private dataSource: RestDataSourceService) {
    this.setFileName(this.getLocalFileName());
  }

  private setFileName(value: string) {
    this.fileName = value;
    this.currentFileName.next(this.fileName);
  }

  private setPassDataFileInfo(value: PassDataFileInfo): void {
    this.passDataFileInfo = value;
    this.currentPassDataFileInfo.next(this.passDataFileInfo);
  }

  public updateFileName(value: string): void {
    if (value && !!value.trim()) {
      this.fileName = value.trim();
    } else {
      this.fileName = null;
    }
    this.writeLocalFileName();
    this.setFileName(this.fileName);
  }

  public requestPassDataFileInfo(): Observable<HttpResponse<PassDataFileInfo>> {
    return this.dataSource.postResponse('fileinfo', new PassDataFileRequest(this.fileName));
  }

  private getLocalFileName(): string {
    return localStorage.getItem(this.LOCAL_STORAGE_FILE_NAME_KEY);
  }

  private writeLocalFileName(): void {
    if (this.fileName) {
      localStorage.setItem(this.LOCAL_STORAGE_FILE_NAME_KEY, this.fileName);
    } else {
      localStorage.removeItem(this.LOCAL_STORAGE_FILE_NAME_KEY);
    }
  }

  public loadFileInfo(): void {
    this.loading = true;
    this.setPassDataFileInfo(null);

    this.requestPassDataFileInfo().subscribe(
      data => {
        this.loading = false;
        this.setPassDataFileInfo(data.body);
      },
      error => {
        this.loading = false;
        this.setPassDataFileInfo(null);
      }
    );
  }


}
