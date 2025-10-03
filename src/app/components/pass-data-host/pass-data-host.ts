import {Component, inject, OnDestroy, ViewChild} from '@angular/core';
import {PassDataCategoryList} from '../pass-data-category-list/pass-data-category-list';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {PassDataNoteList} from '../pass-data-note-list/pass-data-note-list';
import {AsyncPipe} from '@angular/common';
import {ScreenService} from '../../services/screen-service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-pass-data-host',
  imports: [
    MatSidenavModule,
    PassDataCategoryList,
    PassDataNoteList,
    AsyncPipe,
  ],
  templateUrl: './pass-data-host.html',
  styleUrl: './pass-data-host.scss'
})
export class PassDataHost implements OnDestroy {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  screenService = inject(ScreenService);
  subscription: Subscription;

  constructor() {
    this.subscription = this.screenService.toggleAction$.subscribe(() => {
      this.sidenav.toggle();
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
