import {AfterViewInit, Component, ElementRef, inject, ViewChild} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {catchError, map, of, Subject, switchMap, tap} from 'rxjs';
import {PassDataService} from '../../services/pass-data-service';
import {PassDataPersistRequest} from '../../models/pass-data';
import {PassDataFileService} from '../../services/pass-data-file-service';
import {MessageService} from '../../services/message-service';
import {AsyncPipe} from '@angular/common';
import {Loader} from '../loader/loader';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-password',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    AsyncPipe,
    Loader,
  ],
  templateUrl: './password.html',
  styleUrl: './password.scss'
})
export class Password implements AfterViewInit {
  router = inject(Router)
  passDataFileService = inject(PassDataFileService);
  passDataService = inject(PassDataService);
  messageService = inject(MessageService);

  @ViewChild('passwordInput') passwordInput!: ElementRef;

  fb = inject(FormBuilder)

  errorObject: any = undefined;
  submitted = false;

  passwordForm = this.fb.group({
    passwordControl: ['', Validators.required],
  })

  submitSubject = new Subject<PassDataPersistRequest>();

  submitAction$ = this.submitSubject.asObservable().pipe(
    tap(v => {
      console.log(`Submit: ${JSON.stringify(v)}`)
      this.submitted = true;
    }),
    switchMap(v =>
      this.passDataService.get(v).pipe(
        map(v1 => {
          // error message returned by service
          if (!!v1.errorMessage) {
            throw Error(v1.errorMessage)
          } else {
            return v1;
          }
        }),
        catchError(err => {
            this.errorObject = err
            console.error(`Wrong password ${JSON.stringify(v)}`)
            console.error(err)
            return of(`Wrong password (${err.message})`)
        }),
      )
    ),
    tap(v => {
      this.submitted = false;
      if (v && typeof v === 'string') {
        this.messageService.showError(v)
      } else {
        this.router.navigate(['main']).then()
      }
    })

  )

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!!environment.password && !!this.passDataFileService.getPassDataFileName()) {
        this.submitSubject.next(
          {
            fileName: this.passDataFileService.getPassDataFileName() as string,
            password: environment.password
          } as PassDataPersistRequest
        )
      } else {
        this.passwordInput.nativeElement.focus();
      }
    }, 0);
  }

  onPasswordInput(): void {
    if (this.passwordForm.valid) {
      const password = this.passwordForm.value.passwordControl as string
      console.log(`Input password: ${password}`)
      this.submitSubject.next({
        fileName: this.passDataFileService.getPassDataFileName() as string,
        password: password
      } as PassDataPersistRequest)
    } else {
      console.error('Invalid form')
    }
  }
}
