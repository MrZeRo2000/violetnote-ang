import {inject, Injectable} from '@angular/core';
import {DataSource} from './data-source';
import {PassData, PassDataPersistRequest} from '../models/pass-data';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassDataService {
  private dataSource = inject(DataSource);

  public create(persistRequest: PassDataPersistRequest): Observable<PassData> {
    return this.dataSource.postResponseData<PassData>(
      "v2/passdata2/new",
      persistRequest
    )
  }

  public get(persistRequest: PassDataPersistRequest): Observable<PassData> {
    return this.dataSource.postResponseData<PassData>(
      "v2/passdata2",
      persistRequest
    )
  }
}
