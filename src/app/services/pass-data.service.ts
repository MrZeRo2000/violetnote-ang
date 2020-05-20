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

@Injectable({
  providedIn: 'root'
})
export class PassDataService {
  private passData: PassData = null;
  private passDataFileInfo: PassDataFileInfo = null;
  private selectedPassCategory: PassCategory = null;

  currentPassData: Subject<PassData> = new BehaviorSubject<PassData>(null);
  currentPassCategory: Subject<PassCategory> = new BehaviorSubject<PassCategory>(null);
  currentSearchStrings: Subject<Array<string>> = new BehaviorSubject<Array<string>>(null);

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

  public setPassData(passData) {
    if (passData) {
      this.passData = new PassData(passData);
      this.setSelectedPassCategory(this.passData.passCategoryList[0]);
      this.currentSearchStrings.next(this.getSearchStrings());
    } else {
      this.passData = null;
      this.setSelectedPassCategory(null);
      this.currentSearchStrings.next(null);
    }
    this.currentPassData.next(passData);
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
    this.clearPassData();

    this.requestPassData().subscribe(data => {
      if (data.body.errorMessage) {
        this.reportLoadErrorMessage(data.body.errorMessage);
      } else {
        this.setPassData(data.body);
      }
    }, error =>  {
      this.reportLoadErrorMessage(error.message);
    });

  }

  public isPassData(): boolean {
    return !!this.passData;
  }

  public getSelectedPassCategory() {
    return this.selectedPassCategory;
  }

  public setSelectedPassCategory(passCategory: PassCategory) {
    this.selectedPassCategory = passCategory;
    this.currentPassCategory.next(passCategory);
  }

  public getPassData() {
    return this.passData;
  }

  public getPassNotes() {
    return this.getPassData() ? this.getPassData().passNoteList.filter(
      (note) => note.passCategory.categoryName === this.selectedPassCategory.categoryName
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
}
