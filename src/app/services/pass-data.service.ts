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
import {ArrayUtils} from '../utils/array-utils';
import {PassDataPersistRequest} from '../model/pass-data-persist-request';

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

  currentPassData: BehaviorSubject<PassData> = new BehaviorSubject<PassData>(null);
  currentPassCategory: BehaviorSubject<PassCategory> = new BehaviorSubject<PassCategory>(null);
  currentPassNotes: BehaviorSubject<Array<PassNote>> = new BehaviorSubject<Array<PassNote>>(null);
  updatedPassNotes: Subject<Array<PassNote>> = new Subject<Array<PassNote>>();
  currentPassNote: BehaviorSubject<PassNote> = new BehaviorSubject<PassNote>(null);
  currentSearchStrings: Subject<Array<string>> = new BehaviorSubject<Array<string>>(null);
  currentOperationMode: BehaviorSubject<OperationMode> = new BehaviorSubject<OperationMode>(null);
  currentPassDataDirty: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  currentLoadingState: BehaviorSubject<boolean> = new BehaviorSubject(false);

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
      this.currentOperationMode.next(this.getOperationMode());

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
      this.clearNoteSelection();
    }
  }

  private clearNoteSelection(): void {
    this.currentPassNote.next(null);
  }

  public clearPassData() {
    this.setPassData(null);
  }

  private requestPassData(): Observable<HttpResponse<any>> {
    this.currentLoadingState.next(true);
    return this.dataSource.postResponse('',
      new PassDataGetRequest(this.passDataFileInfo.name, this.authService.getPassword())
      );
  }

  private editPassData(): Observable<HttpResponse<any>> {
    this.currentLoadingState.next(true);
    return this.dataSource.postResponse('/edit',
      new PassDataPersistRequest(this.passDataFileInfo.name, this.authService.getPassword(), this.getPassData())
    );
  }

  private newPassData(): Observable<HttpResponse<any>> {
    this.currentLoadingState.next(true);
    return this.dataSource.postResponse('/new',
      new PassDataPersistRequest(this.passDataFileInfo.name, this.authService.getPassword(), this.getPassData())
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

  private handleDataAction(action: Observable<HttpResponse<any>>): void {
    action.subscribe(data => {
      this.currentLoadingState.next(false);

      this.passDataFileNameService.updateFileInfo();

      if (data.body.errorMessage) {
        this.reportLoadErrorMessage(data.body.errorMessage);
        this.clearPassData();
      } else {
        this.setPassData(data.body);
        if (this.getOperationMode() === OperationMode.OM_NEW) {
          this.currentOperationMode.next(OperationMode.OM_EDIT);
        }
      }
    }, error => {
      this.currentLoadingState.next(false);

      this.reportLoadErrorMessage(error.message);
      this.clearPassData();
    });
  }

  public initPassData() {
    this.clearLoadErrorMessage();
    this.setPassData(PassData.createNew());
  }

  public loadPassData() {
    this.clearLoadErrorMessage();
    // this.clearPassData();
    this.handleDataAction(this.requestPassData());
  }

  public isPassData(): boolean {
    return !this.currentLoadingState.getValue() && !!this.currentPassData.getValue();
  }

  public savePassData() {
    this.clearLoadErrorMessage();

    let action: Observable<HttpResponse<any>>;

    switch (this.getOperationMode()) {
      case OperationMode.OM_EDIT:
        action = this.editPassData();
        break;

      case OperationMode.OM_NEW:
        action = this.newPassData();
        break;
    }

    if (action) {
      this.handleDataAction(action);
    }

  }

  public getSelectedPassCategory() {
    return this.currentPassCategory.getValue();
  }

  public setSelectedPassCategory(passCategory: PassCategory) {
    this.currentPassNotes.next(this.getPassNotesByCategory(passCategory));
    this.currentPassCategory.next(passCategory);
    this.clearNoteSelection();
  }

  public getOperationMode(): OperationMode {
    return this.currentOperationMode.getValue();
  }

  public setOperationMode(operationMode: OperationMode) {
    this.currentOperationMode.next(operationMode);
  }

  public getPassData() {
    return this.currentPassData.getValue();
  }

  public getPassNotes() {
    return this.currentPassNotes.getValue();
  }

  public getPassNotesByCategory(passCategory: PassCategory): Array<PassNote> {
    return this.getPassData() && passCategory ? this.getPassData().passNoteList.filter(
      (note) => note.passCategory.categoryName === passCategory.categoryName
    ) : [];
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

      ArrayUtils.deleteArrayElement(this.getPassData().passCategoryList, value);

      /*
      this.getPassData().passCategoryList =
        this.getPassData().passCategoryList
          .filter(pc => pc.categoryName !== value.categoryName);
       */

      this.currentPassData.next(this.getPassData());
      this.selectFirstCategory();
    }
  }

  public movePassCategory(fromIndex: number, toIndex: number): void {
    if (fromIndex !== toIndex) {
      ArrayUtils.moveArrayElement(this.getPassData().passCategoryList, fromIndex, toIndex);

      this.currentPassData.next(this.getPassData());
      this.currentPassDataDirty.next(true);
    }
  }

  private passNoteChanged(): void {
    // this.currentPassNote.next(null);
    // this.setSelectedPassCategory(this.getSelectedPassCategory());
    this.currentPassNotes.next(this.getPassNotesByCategory(this.getSelectedPassCategory()));
    if (this.currentPassNotes.value) {
      this.updatedPassNotes.next(this.currentPassNotes.value);
    }
    this.currentSearchStrings.next(this.getSearchStrings());
    this.currentPassDataDirty.next(true);
  }

  public deletePassNote(value: PassNote): void {
    ArrayUtils.deleteArrayElement(this.getPassData().passNoteList, value);
    this.passNoteChanged();
  }

  public insertPassNote(value: PassNote): void {
    this.getPassData().passNoteList.push(value);
    this.passNoteChanged();
  }

  public updatePassNote(oldValue: PassNote, newValue: PassNote): void {
    const oldValueIndex = this.getPassData().passNoteList.indexOf(oldValue);
    if (oldValueIndex > -1) {
      this.getPassData().passNoteList[oldValueIndex] = newValue;
      this.passNoteChanged();
      this.currentPassNote.next(newValue);
    }
  }

  public movePassNote(fromIndex: number, toIndex: number): void {
    if (fromIndex !== toIndex) {
      ArrayUtils.moveArrayElement(this.getPassData().passNoteList, fromIndex, toIndex);

      this.passNoteChanged();
    }
  }

}
