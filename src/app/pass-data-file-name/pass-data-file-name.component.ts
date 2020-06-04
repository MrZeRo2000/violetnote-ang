import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {PassDataFileNameService} from '../services/pass-data-file-name.service';
import {Subscription} from 'rxjs';
import {PassDataFileInfo} from '../model/pass-data-file-info';

@Component({
  selector: 'app-pass-data-file-name',
  templateUrl: './pass-data-file-name.component.html',
  styleUrls: ['./pass-data-file-name.component.scss']
})
export class PassDataFileNameComponent implements OnInit, AfterViewInit, OnDestroy {
  fileName: string;
  passDataFileInfo: PassDataFileInfo = null;

  editFileName: string;

  editing = false;

  @ViewChild('fileNameControl') fileNameControl: ElementRef;
  @ViewChildren('fileNameControl') fileNameControls: QueryList<ElementRef>;

  private fileNameSubscription: Subscription;
  private passDataFileNameSubscription: Subscription;

  constructor(private passDataFileNameService: PassDataFileNameService) { }

  ngOnInit(): void {
    this.fileNameSubscription = this.passDataFileNameService.currentFileName.subscribe(value => {
      this.fileName = value;
      if (this.fileName) {
        this.passDataFileNameService.loadFileInfo();
      }
    });
    this.passDataFileNameSubscription = this.passDataFileNameService.currentPassDataFileInfo.subscribe(value => {
      this.passDataFileInfo = value;
    });
  }

  ngAfterViewInit(): void {
    this.fileNameControls.changes.subscribe(() => {
      if (this.fileNameControls.length > 0) {
        this.fileNameControls.first.nativeElement.focus();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.fileNameSubscription) {
      this.fileNameSubscription.unsubscribe();
    }
    if (this.passDataFileNameSubscription) {
      this.passDataFileNameSubscription.unsubscribe();
    }
  }

  onFileNameClick(event: any) {
    event.preventDefault();
    this.editing = true;
    this.editFileName = this.fileName;
    // this.fileNameControl.nativeElement.focus();
    // setTimeout(() => this.fileNameControl.nativeElement.focus());
  }

  onFileNameControlKeyUp(event: any) {
    if (event.key === 'Escape') {
      this.editing = false;
    } else if (event.key === 'Enter') {
      console.log(event);
    }
  }

  onSubmit(event: any) {
    event.preventDefault();
    this.editing = false;
    this.saveFileName(this.editFileName);
  }

  onCancel(event: any) {
    event.preventDefault();
    this.editing = false;
  }

  private saveFileName(fileName: string): void {
    this.passDataFileNameService.updateFileName(fileName);
    this.passDataFileNameService.loadFileInfo();
  }

}
