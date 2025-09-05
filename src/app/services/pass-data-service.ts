import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {DataSource} from './data-source';
import {PassData, PassDataMode, PassDataPersistRequest} from '../models/pass-data';
import {BehaviorSubject, catchError, Observable, of, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassDataService {
  private static readonly API_PATH = 'v2/passdata2'

  private dataSource = inject(DataSource);
  private passDataSubject = new BehaviorSubject<PassData | null>(null);
  private passDataMode = signal<PassDataMode>(PassDataMode.PDM_VIEW);
  private passDataChanged = signal(false);
  private password?: string;

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
      `${PassDataService.API_PATH}/new`,
      persistRequest
    ).pipe(
      tap(() => {
        this.password = persistRequest.password
        this.passDataMode.set(PassDataMode.PDM_VIEW)
        this.passDataChanged.set(false);
      })
    )
  }

  public get(persistRequest: PassDataPersistRequest): Observable<PassData> {
    return this.dataSource.postResponseData<PassData>(
      PassDataService.API_PATH,
      persistRequest
    ).pipe(
      tap(v => {
        if (v.errorMessage) {
          this.password = undefined;
          this.passDataSubject.next(null);
        } else {
          this.password = persistRequest.password
          this.passDataSubject.next(v);
          this.passDataMode.set(PassDataMode.PDM_VIEW)
          this.passDataChanged.set(false);
        }
      }),
    )
  }

  public save(persistRequest: PassDataPersistRequest): Observable<PassData> {
    const passDataValue = this.getPassDataValue();
    if (passDataValue) {
      persistRequest = {...persistRequest, password: this.password, passData: passDataValue};
      console.log(`Starting save`)
      return this.dataSource.postResponseData<PassData>(
        `${PassDataService.API_PATH}/edit`,
        persistRequest
      ).pipe(
        tap(v => {
          if (!v.errorMessage) {
            this.passDataChanged.set(false);
          }
        }),
        catchError(err => {
          console.error(`Error saving file: ${JSON.stringify(err)}`)
          return of({
            errorCode: -2,
            errorMessage: `Error saving file: ${err.message}`,
          } as PassData)
        }),
      )
    } else {
      return of ({
        errorCode: -1,
        errorMessage: "Data not found",
      } as PassData)
    }
  }

  public update(passData: PassData) {
    this.passDataSubject.next(passData);
    this.passDataChanged.set(true);
  }

}
