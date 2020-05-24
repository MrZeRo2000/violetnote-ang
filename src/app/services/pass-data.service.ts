import {Injectable} from '@angular/core';
import {PassData} from '../model/pass-data';
import {PassCategory} from '../model/pass-category';
import {PassNote} from '../model/pass-note';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {PassDataFileNameService} from './pass-data-file-name.service';
import {RestDataSourceService} from '../data-source/rest-data-source.service';

import {HttpResponse} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Message, MessagesService, MessageType} from '../messages/messages.service';
import {PassDataGetRequest} from '../model/pass-data-get-request';
import {PassDataFileInfo} from '../model/pass-data-file-info';

export enum OperationMode {
  OM_VIEW,
  OM_EDIT,
  OM_NEW
}

@Injectable({
  providedIn: 'root'
})
export class PassDataService {
  private passDataFileInfo: PassDataFileInfo = null;

  private operationMode: OperationMode;

  currentPassData: BehaviorSubject<PassData> = new BehaviorSubject<PassData>(null);
  currentPassCategory: BehaviorSubject<PassCategory> = new BehaviorSubject<PassCategory>(null);
  currentSearchStrings: Subject<Array<string>> = new BehaviorSubject<Array<string>>(null);
  currentOperationMode: BehaviorSubject<OperationMode> = new BehaviorSubject<OperationMode>(null);
  currentPassDataDirty: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  selectedNotes: PassNote[] = [];

  constructor(
    private dataSource: RestDataSourceService,
    private passDataFileNameService: PassDataFileNameService,
    private authService: AuthService,
    private messagesService: MessagesService
    ) {
    this.passDataFileNameService.currentPassDataFileInfo.subscribe(value => {
      this.passDataFileInfo = value;
      this.setPassData(null);
    });
  }

  public setPassData(value) {
    if (value) {
      const passData = new PassData(value);

      this.currentPassData.next(passData);
      this.currentOperationMode.next(this.operationMode);

      this.selectFirstCategory();
      this.currentSearchStrings.next(this.getSearchStrings());
    } else {
      this.currentSearchStrings.next(null);
      this.currentPassData.next(null);

      this.setSelectedPassCategory(null);
    }
    this.currentPassDataDirty.next(false);
  }

  private selectFirstCategory(): void {
    const passData = this.getPassData();
    if (passData && passData.passCategoryList && passData.passCategoryList.length > 0) {
      this.setSelectedPassCategory(passData.passCategoryList[0]);
    }
  }

  public clearPassData() {
    this.setPassData(null);
  }

  private requestPassData(): Observable<HttpResponse<any>> {
    return this.dataSource.postResponse('',
      new PassDataGetRequest(this.passDataFileInfo.name, this.authService.getPassword())
      );
  }

  private reportLoadErrorMessage(message: string) {
    this.messagesService.reportMessage(
      new Message(
        MessageType.MT_ERROR,
        message,
        true,
        'PassData'
      )
    );
  }

  private clearLoadErrorMessage() {
    this.messagesService.reportMessage(null);
  }

  public loadPassData() {
    this.clearLoadErrorMessage();
    // this.clearPassData();

    this.requestPassData().subscribe(data => {
      if (data.body.errorMessage) {
        this.reportLoadErrorMessage(data.body.errorMessage);
        this.clearPassData();
      } else {
        this.setPassData(data.body);
      }
    }, error => {
      this.reportLoadErrorMessage(error.message);
      this.clearPassData();
    });
  }

  public isPassData(): boolean {
    return !!this.currentPassData.getValue();
  }

  public getSelectedPassCategory() {
    return this.currentPassCategory.getValue();
  }

  public setSelectedPassCategory(passCategory: PassCategory) {
    this.selectedNotes = this.getPassData() && passCategory ? this.getPassData().passNoteList.filter(
      (note) => note.passCategory.categoryName === passCategory.categoryName
    ) : [];
    this.currentPassCategory.next(passCategory);
  }

  public setOperationMode(operationMode: OperationMode) {
    this.operationMode = operationMode;
  }

  public getPassData() {
    return this.currentPassData.getValue();
  }

  public getPassNotes() {
    return this.selectedNotes;
  }

  public getSearchPassNotes(searchString: string): Array<PassNote>  {
    if ((searchString === undefined) || (searchString == null)) {
      return this.getPassData().passNoteList;
    } else {
      const searchExp = new RegExp(`.*${searchString}.*`, 'i');

      return this.getPassData().passNoteList.filter(
        (note) => searchExp.test(note.system) || searchExp.test(note.user)
      );
    }
  }

  public getSearchStrings(): Array<string> {
    const items = Array.from(
      new Set<string>(
        [].concat.apply([], this.getPassData().passNoteList.map(
          a => [a.user.toLowerCase(), a.system.toLowerCase()]
        )
        )
      )
    );
    return items.sort();
  }

  public insertPassCategory(value: PassCategory): void {
    this.getPassData().passCategoryList.push(value);
    this.currentPassDataDirty.next(true);
  }

  public updatePassCategory(value: PassCategory): void {
    // update category in notes
    this.getPassNotes()
      .map(pn => pn.passCategory.categoryName = value.categoryName);
    // update category
    this.currentPassCategory.getValue().categoryName = value.categoryName;

    this.currentPassDataDirty.next(true);
  }

  public deletePassCategory(value: PassCategory): void {
    // check if the category is empty
    if (
      this.getPassData().passNoteList
        .filter(pn => pn.passCategory.categoryName === value.categoryName)
        .length === 0
    ) {

      this.getPassData().passCategoryList =
        this.getPassData().passCategoryList
          .filter(pc => pc.categoryName !== value.categoryName);

      this.currentPassData.next(this.getPassData());
      this.selectFirstCategory();
    }
  }

  public movePassCategory(fromIndex: number, toIndex: number): void {
    if (fromIndex !== toIndex) {
      const passCategoryList = this.getPassData().passCategoryList;
      passCategoryList.splice(toIndex, 0, passCategoryList.splice(fromIndex, 1)[0]);

      this.currentPassData.next(this.getPassData());
      this.currentPassDataDirty.next(true);
    }
  }
}
