import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-copy-value-panel',
  templateUrl: './copy-value.component.html',
  styleUrls: ['./copy-value.component.scss']
})
export class CopyValueComponent implements OnInit {

  isOpen = false;

  @Input()
  name: string;

  @Input()
  value: string;

  constructor() { }

  ngOnInit(): void {

  }

  onButtonClick(event: any) {
    event.preventDefault();
    event.stopPropagation();
    navigator.clipboard.writeText(this.value).then(() => {
      this.isOpen = true;
      setTimeout(() => {this.isOpen = false}, 1000);
    });
  }

  getPopover(): string {
    if (!!this.name) {
      return `${this.name} copied`
    } else {
      return 'Copied'
    }
  }

}
