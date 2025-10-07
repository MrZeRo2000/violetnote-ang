import {inject, Injectable} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  breakpointObserver = inject(BreakpointObserver);
  smallScreen$ = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
  mediumScreen$ = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])

  private toggleSubject = new Subject<void>();
  toggle() {
    this.toggleSubject.next();
  }
  toggleAction$ = this.toggleSubject.asObservable();
}
