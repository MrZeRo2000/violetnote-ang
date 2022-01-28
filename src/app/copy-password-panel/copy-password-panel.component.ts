import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-copy-password-panel',
  templateUrl: './copy-password-panel.component.html',
  styleUrls: ['./copy-password-panel.component.scss']
})
export class CopyPasswordPanelComponent implements OnInit {

  isOpen = false;

  @Input()
  password: string;

  constructor() { }

  ngOnInit(): void {

  }

  onButtonClick(event: any) {
    console.log(`Clicked with ${this.password}`);
    navigator.clipboard.writeText(this.password).then(() => {
      console.log('Copied');
      this.isOpen = true;
      setTimeout(() => {this.isOpen = false}, 1000);

    });
  }

}
