import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  @Input() inputPassword1: String;

  constructor() { }

  ngOnInit() {
  }

  onSubmitPassword() {
    console.log('Submit password, data from input:' + this.inputPassword1);
  }

  onPasswordKeyUp(event: any) {
    console.log(event.target.value);
    if (event.key === 'Enter') {
      console.log('Entered password:' + event.target.value);
    }
  }
}
