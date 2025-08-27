import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {DataSource} from './data-source';
import {PassData, PassDataMode, PassDataPersistRequest} from '../models/pass-data';
import {BehaviorSubject, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassDataService {
  private dataSource = inject(DataSource);
  private passDataSubject = new BehaviorSubject<PassData | null>(null);
  private passDataMode = signal<PassDataMode>(PassDataMode.PDM_VIEW);
  private passDataChanged = signal(false);

  getPassDataValue(): PassData | null {
    return this.passDataSubject.getValue()
  }

  clearPassData(): void {
    this.passDataSubject.next(null);
  }

  getPassData(): Observable<PassData | null> {
    return this.passDataSubject.asObservable();
  }

  get passDataModeSignal(): Signal<PassDataMode> {
    return this.passDataMode.asReadonly();
  }

  setPassDataMode(mode: PassDataMode): void {
    this.passDataMode.set(mode);
  }

  get passDataModeReadOnlySignal(): Signal<Boolean> {
    return computed(() => this.passDataMode() === PassDataMode.PDM_VIEW)
  }

  get passDataChangedSignal(): Signal<Boolean> {
    return this.passDataChanged.asReadonly();
  }

  public create(persistRequest: PassDataPersistRequest): Observable<PassData> {
    return this.dataSource.postResponseData<PassData>(
      "v2/passdata2/new",
      persistRequest
    ).pipe(
      tap(() => {
        this.passDataMode.set(PassDataMode.PDM_VIEW)
        this.passDataChanged.set(false);
      })
    )
  }

  public get(persistRequest: PassDataPersistRequest): Observable<PassData> {
    return this.dataSource.postResponseData<PassData>(
      "v2/passdata2",
      persistRequest
    ).pipe(
      tap(v => {
        this.passDataSubject.next(v);
        this.passDataMode.set(PassDataMode.PDM_VIEW)
        this.passDataChanged.set(false);
      }),
    )
  }

  public update(passData: PassData) {
    this.passDataSubject.next(passData);
    this.passDataChanged.set(true);
  }
}
