import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-pass-data-file-name',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatButtonModule,
  ],
  templateUrl: './pass-data-file-name.html',
  styleUrl: './pass-data-file-name.scss'
})
export class PassDataFileName {
  fb = inject(FormBuilder)

  editForm = this.fb.group({
    fileNameControl: ['', Validators.required],
  })
}
