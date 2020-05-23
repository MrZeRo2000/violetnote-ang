import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appInitFocus]'
})
export class InitFocusDirective implements AfterViewInit {

  constructor(private element: ElementRef) { }

  ngAfterViewInit(): void {
    setTimeout(() => {this.element.nativeElement.focus(); }, 0);
  }
}
