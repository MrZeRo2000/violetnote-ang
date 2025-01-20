import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {PassDataFileNameService} from '../services/pass-data-file-name.service';
import {Subscription} from 'rxjs';
import {PassDataFileInfo} from '../model/pass-data-file-info';
import {PassDataService} from '../services/pass-data.service';

@Component({
    selector: 'app-pass-data-file-name',
    templateUrl: './pass-data-file-name.component.html',
    styleUrls: ['./pass-data-file-name.component.scss'],
    standalone: false
})
export class PassDataFileNameComponent implements OnInit, AfterViewInit, OnDestroy {
  fileName: string;
  passDataFileInfo: PassDataFileInfo = null;

  editFileName: string;

  editing = false;

  passDataLoading = false;

  @ViewChild('fileNameControl') fileNameControl: ElementRef;
  @ViewChildren('fileNameControl') fileNameControls: QueryList<ElementRef>;

  private fileNameSubscription: Subscription;
  private passDataFileNameSubscription: Subscription;
  private updatedPassDataFileNameSubscription: Subscription;
  private passDataLoadingState: Subscription;

  constructor(
    private passDataFileNameService: PassDataFileNameService,
    private passDataService: PassDataService
  ) { }

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
    this.updatedPassDataFileNameSubscription =
      this.passDataFileNameService.updatedPassDataFileInfo.subscribe(value => {
        this.passDataFileInfo.exists = value.exists;
      });

    this.passDataLoadingState = this.passDataService.currentLoadingState.subscribe(value => {
      this.passDataLoading = value;
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
    this.fileNameSubscription.unsubscribe();
    this.passDataFileNameSubscription.unsubscribe();
    this.updatedPassDataFileNameSubscription.unsubscribe();
    this.passDataLoadingState.unsubscribe();
  }

  onFileNameClick(event: any) {
    event.preventDefault();
    if (!this.passDataLoading) {
      this.editing = true;
      this.editFileName = this.fileName;
      // this.fileNameControl.nativeElement.focus();
      // setTimeout(() => this.fileNameControl.nativeElement.focus());
    }
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
