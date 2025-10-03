import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {PassDataService} from '../services/pass-data-service';

export const passDataGuard: CanActivateFn = () => {
  const passDataService = inject(PassDataService)
  const router = inject(Router);

  const result = !!passDataService.getPassDataValue();
  return result || router.navigate(['']);
};
