import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {PassDataFileNameService} from '../services/pass-data-file-name.service';

@Component({
  selector: 'app-pass-data-file-name',
  templateUrl: './pass-data-file-name.component.html',
  styleUrls: ['./pass-data-file-name.component.scss']
})
export class PassDataFileNameComponent implements OnInit {
  fileName: string;
  editFileName: string;

  editing = false;

  @ViewChild('fileNameControl') fileNameControl: ElementRef;

  constructor(private passDataFileNameService: PassDataFileNameService) { }

  ngOnInit(): void {
    this.passDataFileNameService.currentFileName.subscribe(value => this.fileName = value);
  }

  onFileNameClick(event: any) {
    event.preventDefault();
    this.editing = true;
    this.editFileName = this.fileName;
    setTimeout(() => this.fileNameControl.nativeElement.focus());
  }

  onFileNameControlKeyUp(event: any) {
    if (event.key === 'Escape') {
      this.editing = false;
    } else if (event.key === 'Enter') {
      console.log(event);
    }
  }

  onSubmit(event: any) {
    this.editing = false;
  }

  onCancel(event: any) {
    this.editing = false;
  }

}
