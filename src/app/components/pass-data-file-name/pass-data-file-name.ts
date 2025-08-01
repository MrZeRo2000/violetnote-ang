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
import {startWith, Subject, tap} from 'rxjs';
import {MatRadioModule} from '@angular/material/radio';
import {AsyncPipe} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

enum FileMode {
  FM_NEW,
  FM_EXISTING
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
    AsyncPipe
  ],
  templateUrl: './pass-data-file-name.html',
  styleUrl: './pass-data-file-name.scss'
})
export class PassDataFileName {

  FileMode = FileMode

  fb = inject(FormBuilder)

  editForm = this.fb.group({
        fileModeControl: [FileMode.FM_EXISTING, Validators.required],
        fileNameControl: ['', Validators.required],
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

  submitSubject = new Subject<string>();

  submitAction$ = this.submitSubject.asObservable().pipe(

  )

}
