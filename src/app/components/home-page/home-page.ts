import {Component, inject, OnDestroy} from '@angular/core';
import {Loader} from '../loader/loader';
import {AppConfigService} from '../../services/app-config-service';
import {catchError, combineLatest, map, of, tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MessageService} from '../../services/message-service';
import {PassDataFileService} from '../../services/pass-data-file-service';

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

  private messageService = inject(MessageService);
  private appConfigService = inject(AppConfigService);
  private passDataFileService = inject(PassDataFileService);

  errorObject: any = undefined;

  data$ = combineLatest([
    this.appConfigService.getAppInfo().pipe(
      catchError(err => {
        this.errorObject = err
        console.log("Error getting application version")
        console.error(err)
        throw Error("Error getting application version")
      })
    ),
    this.passDataFileService.getPassDataFileInfo().pipe(
      catchError(err => {
        this.errorObject = err
        console.log("Error getting file info")
        console.error(err)
        throw Error("Error getting file info")
      })
    )]
  ).pipe(
    map(v => {
      return {
        appInfo: v[0],
        passDataFileInfo: v[1]
      }
    }),
    catchError(e => {
      this.messageService.showError(e)
      return of({});
    }),
    tap(v => {
      console.log(`Data result: ${JSON.stringify(v)}`);
    })
  )

  ngOnDestroy(): void {
    this.messageService.dismiss()
  }
}
