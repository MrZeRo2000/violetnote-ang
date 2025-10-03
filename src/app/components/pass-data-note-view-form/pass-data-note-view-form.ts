import {Component, inject, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {PassNote} from '../../models/pass-data';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {environment} from '../../../environments/environment';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {UrlUtils} from '../../utils/url-utils';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {TooltipUtils} from '../../utils/tooltip-utils';

@Component({
  selector: 'app-pass-data-note-view-form',
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    MatExpansionModule,
  ],
  templateUrl: './pass-data-note-view-form.html',
  styleUrl: './pass-data-note-view-form.scss'
})
export class PassDataNoteViewForm implements OnInit {
  fb = inject(FormBuilder)

  copyToClipboard = TooltipUtils.copyToClipboard

  viewForm = this.fb.group({
    systemControl: [''],
    userControl: [''],
    passwordControl: [''],
    urlControl: [''],
    infoControl: [''],
  })

  constructor(
    private dialogRef: MatDialogRef<PassDataNoteViewForm>,
    @Inject(MAT_DIALOG_DATA) private data: PassNote) {
    this.viewForm.patchValue({
      systemControl: this.data.system,
      userControl: this.data.user,
      passwordControl: this.data.password,
      urlControl: UrlUtils.getUrl(this.data.url),
      infoControl: this.data.info,
    })
  }

  ngOnInit(): void {
    if (environment.autoHidePassNoteDelay) {
      setTimeout(() => {
        this.dialogRef.close(true);
      }, environment.autoHidePassNoteDelay);
    }
  }
}
