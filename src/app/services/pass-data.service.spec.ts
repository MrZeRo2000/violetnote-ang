import { TestBed, inject } from '@angular/core/testing';

import { PassDataService } from './pass-data.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DataSourceModule} from '../data-source/data-source.module';
import {AppConfigModule} from '../app-config/app-config.module';
import {AuthService} from './auth.service';
import {PassCategory} from '../model/pass-category';
import {PassNote} from '../model/pass-note';

describe('PassDataService', () => {
  let service: PassDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        DataSourceModule,
        AppConfigModule
      ], providers: [
        AuthService
      ]
    });
    service = TestBed.inject(PassDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('PassDataService operations', () => {

  let service: PassDataService;

  const categoryPins = new PassCategory('PINS');
  categoryPins.noteList = [
    new PassNote('Communication', 'Alex', 'Pass11', 'Url11', 'Info11'),
    new PassNote('Information', 'Eva', 'Pass12', 'Url12', 'Info12'),
    new PassNote('Agriculture', 'Offside', 'Pass13', 'Url13', 'Info13')
  ];

  const categoryEmails = new PassCategory('E-mails');
  categoryEmails.noteList = [
    new PassNote('Science', 'Einstein', 'Pass21', 'Url21', 'Info21'),
    new PassNote('Music', 'Mozart', 'Pass22', 'Url22', 'Info22')
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        DataSourceModule,
        AppConfigModule
      ], providers: [
        AuthService
      ]
    });
    service = TestBed.inject(PassDataService);

    service.setPassData({
      categoryList: [
        categoryPins,
        categoryEmails
        ]
    });
  });

  it ('Pass notes determination', () => {
    service.setSelectedPassCategory(categoryPins);
    expect(service.getPassNotes().length).toBe(3);
    service.setSelectedPassCategory(categoryEmails);
    expect(service.getPassNotes().length).toBe(2);
  });

  it('Pass notes search user', () => {
    const searchNotes = service.getSearchPassNotes('Zart');
    expect(searchNotes.length).toBe(1);
  });

  it('Pass notes search system', () => {
    const searchNotes = service.getSearchPassNotes('tion');
    expect(searchNotes.length).toBe(2);
  });

});
