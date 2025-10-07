import {inject, Injectable, Signal, signal} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class RouterEventsService {
  router = inject(Router)

  _mainRouteSignal = signal(false)

  get mainRouteSignal(): Signal<boolean> {
    return this._mainRouteSignal.asReadonly();
  }

  constructor() {
    this.router.events.pipe(
      takeUntilDestroyed(),
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(v => {
      const currentRoute = v.urlAfterRedirects
      this._mainRouteSignal.set(currentRoute.endsWith('main'))
    })
  }
}
