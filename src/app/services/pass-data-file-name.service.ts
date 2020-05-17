import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {PassDataFileInfo} from '../model/pass-data-file-info';

@Injectable({
  providedIn: 'root'
})
export class PassDataFileNameService {
  private readonly LOCAL_STORAGE_FILE_NAME_KEY = 'passDataFileName';

  private fileName: string;

  currentFileName: Subject<string> = new BehaviorSubject<string>(null);
  currentFileInfo: Subject<PassDataFileInfo> = new BehaviorSubject<PassDataFileInfo>(null);

  constructor() {
    this.readLocalFileName();
  }

  private readLocalFileName(): void {
    this.fileName = localStorage.getItem(this.LOCAL_STORAGE_FILE_NAME_KEY);
    this.currentFileName.next(this.fileName);
  }

  private writeLocalFileName(): void {
    if (this.fileName) {
      localStorage.setItem(this.LOCAL_STORAGE_FILE_NAME_KEY, this.fileName);
    } else {
      localStorage.removeItem(this.LOCAL_STORAGE_FILE_NAME_KEY);
    }
  }

}
