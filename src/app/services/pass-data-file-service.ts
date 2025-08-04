import {inject, Injectable} from '@angular/core';
import {DataSource} from './data-source';
import {PassDataFileInfo, PassDataFileName} from '../models/pass-data-file';
import {Observable, of} from 'rxjs';
import {SharedObservableHandler} from '../utils/rxjs-utils';
import {PassDataPersistRequest, PassData} from '../models/pass-data';

@Injectable({
  providedIn: 'root'
})
export class PassDataFileService {
  private static readonly LOCAL_STORAGE_FILE_NAME_KEY = 'passDataFileNameMat';

  private dataSource = inject(DataSource);
  private passDataFileName: string | null;

  constructor() {
    this.passDataFileName = localStorage.getItem(PassDataFileService.LOCAL_STORAGE_FILE_NAME_KEY);
  }

  public setPassDataFileName(name: string): void {
    this.passDataFileName = name;
    localStorage.setItem(PassDataFileService.LOCAL_STORAGE_FILE_NAME_KEY, this.passDataFileName);
    this.passDataFileInfoSharedObservable.reload();
  }

  private passDataFileInfoSharedObservable =
    new SharedObservableHandler<PassDataFileInfo>(() => this.getFileInfo())

  private passDataFileInfo$ = this.passDataFileInfoSharedObservable.getSharedObservable();

  public getPassDataFileInfo(): Observable<PassDataFileInfo> {
    return this.passDataFileInfo$
  }

  getFileInfo(): Observable<PassDataFileInfo> {
    return !!this.passDataFileName ?
      this.dataSource.postResponseData<PassDataFileInfo>(
        "v2/passdata2/fileinfo",
        {fileName: this.passDataFileName} as PassDataFileName) :
      of({exists: false} as PassDataFileInfo);
  }

  public create(persistRequest: PassDataPersistRequest): Observable<PassData> {
    return this.dataSource.postResponseData<PassData>(
      "v2/passdata2/new",
      persistRequest
    )
  }
}
