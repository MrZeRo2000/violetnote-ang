import {inject, Injectable} from '@angular/core';
import {DataSource} from './data-source';
import {PassData, PassDataPersistRequest} from '../models/pass-data';
import {BehaviorSubject, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassDataService {
  private dataSource = inject(DataSource);
  private passDataSubject = new BehaviorSubject<PassData | null>(null);

  getPassDataValue(): PassData | null {
    return this.passDataSubject.getValue()
  }

  clearPassData(): void {
    this.passDataSubject.next(null);
  }

  getPassData(): Observable<PassData | null> {
    return this.passDataSubject.asObservable();
  }

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
    ).pipe(
      tap(v => {
        this.passDataSubject.next(v);
      }),
    )
  }
}
