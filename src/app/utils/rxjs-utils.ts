import {BehaviorSubject, Observable, shareReplay, switchMap} from 'rxjs';

export class SharedObservableHandler<T> {

  constructor(private sharedFunction: () => Observable<T>) {
  }

  private reloadAction$ = new BehaviorSubject<void>(undefined);

  public reload(): void {
    this.reloadAction$.next(undefined);
  }

  public getSharedObservable(): Observable<T> {
    return this.reloadAction$.pipe(
      switchMap(() => this.sharedFunction()),
      shareReplay(1)
    )
  }
}
