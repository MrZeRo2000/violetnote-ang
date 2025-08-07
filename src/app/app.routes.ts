import { Routes } from '@angular/router';
import {HomePage} from './components/home-page/home-page';
import {PassDataHost} from './components/pass-data-host/pass-data-host';
import {passDataGuard} from './guards/pass-data-guard';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'main',
    component: PassDataHost,
    canActivate: [passDataGuard]
  },
  {
    path: '**',
    redirectTo: '',
  },

];
