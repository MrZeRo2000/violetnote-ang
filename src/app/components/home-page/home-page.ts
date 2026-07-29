import {Component, DestroyRef, inject, OnDestroy, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Loader} from '../loader/loader';
import {AppConfigService} from '../../services/app-config-service';
import {catchError, combineLatest, map, of, tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MessageService} from '../../services/message-service';
import {PassDataFileService} from '../../services/pass-data-file-service';
import {PassDataFileName} from '../pass-data-file-name/pass-data-file-name';
import {ActivatedRoute} from '@angular/router';
import {Password} from '../password/password';
import {PassDataService} from '../../services/pass-data-service';

@Component({
  selector: 'app-home-page',
  imports: [
    Loader,
    AsyncPipe,
    PassDataFileName,
    Password
  ],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home-page.scss'
})
export class HomePage implements OnInit, OnDestroy {
  protected readonly JSON = JSON;

  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  private messageService = inject(MessageService);
  private appConfigService = inject(AppConfigService);
  private passDataService = inject(PassDataService)
  private passDataFileService = inject(PassDataFileService);

  errorObject = signal<any>(undefined);

  configurationRequired = signal(false);

  data$ = combineLatest([
    this.appConfigService.getAppInfo().pipe(
      catchError(err => {
        this.errorObject.set(err)
        console.log("Error getting application version")
        console.error(err)
        throw Error("Error getting application version")
      })
    ),
    this.passDataFileService.getPassDataFileInfo().pipe(
      catchError(err => {
        this.errorObject.set(err)
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
      return of({
          appInfo: null,
          passDataFileInfo: null
      });
    }),
    tap(v => {
      console.log(`Data result: ${JSON.stringify(v)}`);
      if (!!v.passDataFileInfo?.name && !v.passDataFileInfo.exists) {
        this.messageService.showError(`File ${v.passDataFileInfo.name} doesn't exist`)
      }
    })
  )

  ngOnInit(): void {
    this.passDataService.clearPassData();
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      console.log(`HomePage onInit with params: ${JSON.stringify(params)}`)
      this.configurationRequired.set(!!params['configurationRequired'])
      console.log(`HomePage onInit with params: ${JSON.stringify(params)}, configuration required: ${this.configurationRequired()}`)
    })
  }

  ngOnDestroy(): void {
    this.messageService.dismiss()
  }
}
