import {Component, inject, OnDestroy} from '@angular/core';
import {Loader} from '../loader/loader';
import {AppConfigService} from '../../services/app-config-service';
import {catchError, concat, of} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MessageService} from '../../services/message-service';

@Component({
  selector: 'app-home-page',
  imports: [
    Loader,
    AsyncPipe
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage implements OnDestroy {
  protected readonly JSON = JSON;

  private appConfigService = inject(AppConfigService);
  private messageService = inject(MessageService);

  errorObject: any = undefined;

  data$ = concat(
    this.appConfigService.getAppInfo().pipe(
      catchError(err => {
        this.errorObject = err
        console.log("Error getting application version")
        console.error(err)
        throw Error("Error getting application version")
      })
    ),
  ).pipe(
    catchError(e => {
      this.messageService.showError(e)
      return of({});
    })
  )

  ngOnDestroy(): void {
    this.messageService.dismiss()
  }
}
