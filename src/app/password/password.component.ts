import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmitPassword() {
    console.log('Submit password');
  }

  onPasswordKeyUp(event: any) {
    console.log(event.target.value);
    if (event.key === 'Enter') {
      console.log('Entered password:' + event.target.value);
    }
  }
}
