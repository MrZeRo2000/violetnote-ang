import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {PassDataFileInfo} from '../model/pass-data-file-info';
import {PassDataFileNameService} from '../services/pass-data-file-name.service';
import {OperationMode, PassDataService} from '../services/pass-data.service';
import {Subscription} from 'rxjs';
import {Message, MessagesService, MessageType} from '../messages/messages.service';

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.scss'],
    standalone: false
})
export class PasswordComponent implements OnInit, AfterViewInit, OnDestroy {
  OperationMode = OperationMode;

  @Input() inputPassword: string;
  @Input() inputPasswordRetype: string;

  @Input() operationMode: OperationMode = OperationMode.OM_VIEW;

  @ViewChild('password') passwordElement: ElementRef;
  @ViewChildren('password') passwordElements: QueryList<ElementRef>;

  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private messagesService: MessagesService,
    private passDataFileNameService: PassDataFileNameService,
    private passDataService: PassDataService
    ) { }

  passDataFileInfo: PassDataFileInfo;

  private passDataFileInfoSubscription: Subscription;
  private passDataSubscription: Subscription;
  private passDataLoadingStateSubscription: Subscription;

  ngOnInit() {
    this.passDataFileInfoSubscription = this.passDataFileNameService.currentPassDataFileInfo.subscribe(value => {
      this.passDataFileInfo = value;
    });
    this.passDataSubscription = this.passDataService.currentPassData.subscribe(value => {
      if (value) {
        this.router.navigate(['main']);
      } else {
        this.setPasswordFocus();
      }
    });
    this.passDataLoadingStateSubscription = this.passDataService.currentLoadingState.subscribe(value => {
      this.loading = value;
    });

    this.setPasswordFocus();
  }

  ngAfterViewInit(): void {
    console.log('in AfterViewInit');
    if (this.passwordElements.first) {
      console.log('setting focus from first element');
      this.passwordElements.first.nativeElement.focus();
    }
    this.passwordElements.changes.subscribe(value => {
      if (this.passwordElements.length > 0) {
        console.log('setting focus from elements changes');
        this.passwordElements.first.nativeElement.focus();
      }
    });
  }

  ngOnDestroy(): void {
    this.passDataFileInfoSubscription.unsubscribe();
    this.passDataSubscription.unsubscribe();
    this.passDataLoadingStateSubscription.unsubscribe();
  }

  private setPasswordFocus() {
    if (this.passwordElement && this.passwordElement.nativeElement) {
      console.log('setting focus from element');
      this.passwordElement.nativeElement.focus();
    }
  }

  onSubmitPassword() {
    this.submitPassword(this.inputPassword);
  }

  onPasswordKeyUp(event: any) {
    this.messagesService.clearMessage();
    if (event.key === 'Enter') {
      this.submitPassword(this.inputPassword);
    }
  }

  private getOperationMode(): OperationMode {
    if (this.passDataFileInfo.exists) {
      return this.operationMode;
    } else {
      return OperationMode.OM_NEW;
    }
  }

  private checkNewPassword(): boolean {
    if (!this.inputPassword) {
      this.messagesService.reportMessage(new Message(MessageType.MT_ERROR, 'Password should not be empty', true, 'PassData'));
      return false;
    }

    if (this.inputPassword !== this.inputPasswordRetype) {
      this.messagesService.reportMessage(new Message(MessageType.MT_ERROR, 'Password and retype password are not equal', true, 'PassData'));
      return false;
    }

    return true;
  }

  private submitPassword(password: string) {
    if (this.getOperationMode() === this.OperationMode.OM_NEW) {
      //
      if (this.checkNewPassword()) {
        this.authService.setPassword(password);
        this.passDataService.setOperationMode(OperationMode.OM_NEW);
        this.passDataService.initPassData();
      }
    } else {
      this.authService.setPassword(password);
      this.passDataService.setOperationMode(this.getOperationMode());
      this.passDataService.loadPassData();
    }
  }
}
