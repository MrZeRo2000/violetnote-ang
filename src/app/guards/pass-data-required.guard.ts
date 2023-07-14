import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {PassDataService} from '../services/pass-data.service';

@Injectable({
  providedIn: 'root'
})
export class PassDataRequiredGuard  {

  constructor(private router: Router, private passDataService: PassDataService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.passDataService && this.passDataService.isPassData()) {
      return true;
    } else {
      this.router.navigate(['password']);
      return false;
    }
  }
}
