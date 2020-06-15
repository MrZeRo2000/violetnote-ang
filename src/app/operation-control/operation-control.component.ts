import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {OperationMode, PassDataService} from '../services/pass-data.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ConfirmationModalDialogComponent} from '../confirmation-modal-dialog/confirmation-modal-dialog.component';
import {ExportViewComponent} from '../export-view/export-view.component';

@Component({
  selector: 'app-operation-control',
  templateUrl: './operation-control.component.html',
  styleUrls: ['./operation-control.component.scss']
})
export class OperationControlComponent implements OnInit, OnDestroy {

  passDataDirty = false;
  operationMode: OperationMode;

  bsModalRef: BsModalRef;

  private passDataDirtySubscription: Subscription;

  constructor(
    public authService: AuthService,
    public passDataService: PassDataService,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.passDataDirtySubscription =
      this.passDataService.currentPassDataDirty.subscribe(value => {
        this.passDataDirty = value;
      });
  }

  ngOnDestroy(): void {
    this.passDataDirtySubscription.unsubscribe();
  }

  onSaveButtonClick(event: any) {
    this.passDataService.savePassData();
  }

  onExportClick(event: any) {
    event.preventDefault();
    this.modalService.show(ExportViewComponent, {});
  }

  onExitButtonClick(event: any) {
    this.authService.resetPassword();
    this.passDataService.clearPassData();
    this.router.navigate(['']).then();
  }

  passDataSaveAllowed(): boolean {
    return this.passDataDirty && this.passDataService.getPassData().passNoteList.length > 0;
  }

}
