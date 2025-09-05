import {Component, inject} from '@angular/core';
import {ProgressSpinnerOverlayComponent} from '../progress-spinner-overlay/progress-spinner-overlay.component';
import {PassDataService} from '../../services/pass-data-service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {finalize, Subject, switchMap, tap} from 'rxjs';
import {PassDataFileService} from '../../services/pass-data-file-service';
import {PassDataPersistRequest} from '../../models/pass-data';
import {AsyncPipe} from '@angular/common';
import {MessageService} from '../../services/message-service';

@Component({
  selector: 'app-pass-data-save-button',
  imports: [
    MatIconModule,
    MatButtonModule,
    AsyncPipe,
    ProgressSpinnerOverlayComponent,
  ],
  templateUrl: './pass-data-save-button.html',
  styleUrl: './pass-data-save-button.scss'
})
export class PassDataSaveButton {
  passDataService = inject(PassDataService);
  passDataFileService = inject(PassDataFileService)
  messageService = inject(MessageService);

  saveSubject = new Subject<void>();

  saveAction$ = this.saveSubject.pipe(
    tap(() => this.loading = true),
    switchMap(() => this.passDataService.save(
      {
        fileName: this.passDataFileService.getPassDataFileName(),
      } as PassDataPersistRequest
    )),
    tap(v => {
      if (v.errorMessage) {
        this.messageService.showError('Error saving file. See console for details.');
      }
    }),
    finalize(() => this.loading = false)
  )

  loading = false;

  onSave(event : any) {
    event.stopPropagation();
    this.saveSubject.next()
  }

}
