import {Component, Inject, inject, OnInit, ViewChild} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input'
import {PassNote} from '../../models/pass-data';
import {PassDataSelectionService} from '../../services/pass-data-selection-service';
import {debounceTime, distinctUntilChanged, map, Observable, of, startWith, switchMap} from 'rxjs';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-pass-data-note-edit-form',
  imports: [
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    MatAutocomplete,
    MatOption,
    AsyncPipe,
    MatAutocompleteTrigger,
  ],
  templateUrl: './pass-data-note-edit-form.html',
  styleUrl: './pass-data-note-edit-form.scss'
})
export class PassDataNoteEditForm implements OnInit {
  @ViewChild('autoTrigger', { read: MatAutocompleteTrigger }) autocompleteTrigger?: MatAutocompleteTrigger;

  fb = inject(FormBuilder)
  passDataSelectionService = inject(PassDataSelectionService);

  selectedCategory = this.passDataSelectionService.firstSelectedCategory()
  systemOptionsData = [... new Set(this.selectedCategory?.noteList.map(v => v.system))].sort()
  systemOptions$: Observable<Array<string>> | undefined;

  editForm = this.fb.group({
    systemControl: ['', [Validators.required, this.minLengthTrimmedValidator(2),]],
    userControl: ['', [Validators.required, this.existingUserValidator()]],
    passwordControl: ['', [Validators.required]],
    passwordRetypeControl: ['', [Validators.required, this.passwordMatchValidator()]],
    urlControl: [''],
    infoControl: [''],
  })

  minLengthTrimmedValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.trim()
      if (!value || (value.length >= minLength)) {
        return null;
      }
      console.log('Validator returning error')
      return {'minLength': value.length};
    };
  }

  existingUserValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.editForm) {
        return null;
      }

      const value = control.value.trim()
      const systemValue = this.editForm.value.systemControl?.trim();
      if (!value || !systemValue) {
        return null;
      }

      const duplicates = this.selectedCategory?.noteList.filter(
        v => (v.system == systemValue) && (v.user == value) &&
          (v.system !== this.item?.system) && (v.user !== this.item?.user)
      ) || []

      return duplicates.length == 0 ? null : {'existing': true};
    };
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.editForm) {
        return null;
      }

      const value = control.value
      if (!value) {
        return null;
      }

      const passwordValue = this.editForm.value.passwordControl;
      return value === passwordValue ? null : {'passwordMatch': true};
    };
  }


  constructor(private dialogRef: MatDialogRef<PassDataNoteEditForm>,
    @Inject(MAT_DIALOG_DATA) private item?: PassNote) {
    if (item) {
      this.editForm.patchValue({
        systemControl: item.system,
        userControl: item.user,
        passwordControl: item.password,
        passwordRetypeControl: item.password,
        urlControl: item.url,
        infoControl: item.info,
      })
    } else {
      console.log('No item provided');
    }
  }

  onSave(): void {
    const newItem: PassNote = {
      ... this.item,
      system: this.editForm.value.systemControl!.trim(),
      user: this.editForm.value.userControl!.trim(),
      password: this.editForm.value.passwordControl!,
      url: this.editForm.value.urlControl?.trim() || undefined,
      info: this.editForm.value.infoControl?.trim() || undefined,
    }
    this.dialogRef.close(newItem);
  }

  ngOnInit(): void {
    this.systemOptions$ = this.editForm.valueChanges.pipe(
      startWith(null),
      map(v => (typeof v === 'object' && v !== null && 'systemControl' in v) ? v.systemControl as string : ''),
      map(v => v ? v : ' '),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(v => v.length < 2 ?
        of([]) :
        of(this.systemOptionsData.filter(option => option.toLowerCase().includes(v.toLowerCase()))))
    )
  }
}
