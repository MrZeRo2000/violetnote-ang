import { Routes } from '@angular/router';
import {HomePage} from './components/home-page/home-page';
import {PassDataHost} from './components/pass-data-host/pass-data-host';
import {passDataGuard} from './guards/pass-data-guard';
import {PassDataSearchNoteList} from './components/pass-data-search-note-list/pass-data-search-note-list';
import {AttributesForm} from './components/attributes-form/attributes-form';

export const routes: Routes = [
  {
    path: '',
    component: AttributesForm,
  },
  {
    path: 'main',
    component: PassDataHost,
    canActivate: [passDataGuard]
  },
  {
    path: 'search',
    component: PassDataSearchNoteList,
    canActivate: [passDataGuard]
  },
  {
    path: '**',
    redirectTo: '',
  },

];
