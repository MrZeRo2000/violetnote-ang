import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-copy-user-name-password-panel',
    templateUrl: './copy-user-name-password-panel.component.html',
    styleUrls: ['./copy-user-name-password-panel.component.scss'],
    standalone: false
})
export class CopyUserNamePasswordPanelComponent implements OnInit {

  isUserNameOpen: boolean = false;
  isPasswordOpen: boolean = false;

  @Input()
  userName: string;

  @Input()
  password: string;

  constructor() { }

  ngOnInit(): void {
  }

  onUserNameClick(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    if (!!this.userName) {
      navigator.clipboard.writeText(this.userName).then(() => {
        this.isUserNameOpen = true;
        setTimeout(() => {
          this.isUserNameOpen = false
        }, 1000);
      });
    }
  }

  onPasswordClick(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    if (!!this.password) {
      navigator.clipboard.writeText(this.password).then(() => {
        this.isPasswordOpen = true;
        setTimeout(() => {
          this.isPasswordOpen = false
        }, 1000);
      });
    }
  }


}
