import {Component, inject} from '@angular/core';
import {Loader} from '../loader/loader';
import {AppConfigService} from '../../services/app-config-service';
import {concat} from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [
    Loader
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {
  private appConfigService = inject(AppConfigService);

  data$ = concat(
    this.appConfigService.getAppInfo(),
  )
}
