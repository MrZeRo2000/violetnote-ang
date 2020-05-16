import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {PassDataFileNameService} from '../services/pass-data-file-name.service';

@Component({
  selector: 'app-pass-data-file-name',
  templateUrl: './pass-data-file-name.component.html',
  styleUrls: ['./pass-data-file-name.component.scss']
})
export class PassDataFileNameComponent implements OnInit, AfterViewInit {
  fileName: string;
  editing = false;

  @ViewChildren('inlineControl') inlineControl: QueryList<ElementRef>;

  constructor(private passDataFileNameService: PassDataFileNameService) { }

  ngOnInit(): void {
    this.fileName = this.passDataFileNameService.getFileName();
  }

  ngAfterViewInit(): void {
    this.inlineControl.changes.subscribe(() => {
      if (this.inlineControl.length > 0) {
        this.inlineControl.first.nativeElement.focus();
      }
    });
  }

  onFileNameClick(event: any) {
    event.preventDefault();
    this.editing = true;
  }
}
