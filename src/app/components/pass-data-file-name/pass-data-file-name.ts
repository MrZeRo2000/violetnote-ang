import {Component, inject} from '@angular/core';
import {
  AbstractControl,
  FormBuilder, ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {catchError, iif, map, of, startWith, Subject, switchMap, tap} from 'rxjs';
import {MatRadioModule} from '@angular/material/radio';
import {AsyncPipe} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {Loader} from '../loader/loader';
import {PassDataFileService} from '../../services/pass-data-file-service';
import {MessageService} from '../../services/message-service';
import {PassDataPersistRequest} from '../../models/pass-data';
import {Router} from '@angular/router';
import {PassDataService} from '../../services/pass-data-service';

enum FileMode {
  FM_NEW,
  FM_EXISTING
}

interface FormValues {
  fileMode: FileMode;
  fileName: string;
  password: string;
}

@Component({
  selector: 'app-pass-data-file-name',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    AsyncPipe,
    Loader
  ],
  templateUrl: './pass-data-file-name.html',
  styleUrl: './pass-data-file-name.scss'
})
export class PassDataFileName {
  private router = inject(Router);
  private passDataFileService = inject(PassDataFileService);
  private passDataService = inject(PassDataService);
  private messageService = inject(MessageService);

  errorObject: any = undefined;
  submitted = false;

  FileMode = FileMode

  fb = inject(FormBuilder)

  editForm = this.fb.group({
        fileModeControl: [FileMode.FM_EXISTING, Validators.required],
        fileNameControl: [this.passDataFileService.getPassDataFileName() || '', Validators.required],
        passwordControl: [''],
    },{
        validators: [
          (control: AbstractControl): ValidationErrors | null => {
            const fileMode = control.get("fileModeControl")?.value
            const password = control.get("passwordControl")?.value

            if ((fileMode === FileMode.FM_NEW) && (!password)) {
              control.get("passwordControl")?.setErrors({'required': true})
            }
            return null
        }]
    })

  editFormAction$ = this.editForm.valueChanges.pipe(
    startWith(this.editForm.value),
    tap(v => {
      console.log(`Form changed: ${JSON.stringify(v)}`)
    })
  )

  getEditFormData(): FormValues {
    return {
      fileMode: this.editForm.value.fileModeControl,
      fileName: this.editForm.value.fileNameControl,
      password: this.editForm.value.passwordControl,
    } as FormValues
  }

  submitSubject = new Subject<FormValues>();

  submitAction$ = this.submitSubject.asObservable().pipe(
    tap(v => {
      console.log(`Submit: ${JSON.stringify(v)}`)
    }),
    switchMap(v =>
      iif(() => v.fileMode === FileMode.FM_NEW,
        this.passDataService.create({
          fileName: v.fileName,
          password: v.password,
        } as PassDataPersistRequest).pipe(
          map(v1 => {
            // error message returned by service
            if (!!v1.errorMessage) {
              throw Error(v1.errorMessage)
            } else {
              return v;
            }
          }),
          catchError(err => {
            this.errorObject = err
            console.error(`Error creating file: ${JSON.stringify(v)}`)
            console.error(err)
            return of(`Error creating file: ${err.message}`)
          }),
        ),
        of(v).pipe(
          tap(() => this.passDataFileService.setPassDataFileName(v.fileName))
        ),
      )
    ),
    tap(v => {
      this.submitted = false;
      if (v && typeof v === 'string') {
        this.messageService.showError(v)
      } else {
        const vf = v as FormValues
        console.log(`Submit success: ${JSON.stringify(vf)}`)
        this.passDataFileService.setPassDataFileName(vf.fileName)
        this.router.navigate(['/']).then();
      }
    })
  )

  onCancel(event: any): void {
    event.preventDefault();
    this.router.navigate(['']).then()
  }

  onSubmit(event: any): void {
    event.preventDefault()
    this.submitted = true;
    this.submitSubject.next(this.getEditFormData());
  }

}
