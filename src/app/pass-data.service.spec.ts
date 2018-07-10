import { TestBed, inject } from '@angular/core/testing';

import { PassDataService } from './pass-data.service';

describe('PassDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassDataService]
    });
  });

  it('should be created', inject([PassDataService], (service: PassDataService) => {
    expect(service).toBeTruthy();
  }));
});

describe('PassDataService operations', () => {
  let service: PassDataService;
  beforeEach(() => {
    service = new PassDataService();
    service.setPassData({
      passCategoryList: [
        {categoryName: 'PINS'},
        {categoryName: 'E-mails'}
        ],
      passNoteList: [
        {
          passCategory: {categoryName: 'PINS'},
          system: 'Communication',
          user: 'Alex'
        },
        {
          passCategory: {categoryName: 'PINS'},
          system: 'Information',
          user: 'Eva'
        },
        {
          passCategory: {categoryName: 'PINS'},
          system: 'Agriculture',
          user: 'Offside'
        },
        {
          passCategory: {categoryName: 'E-mails'},
          system: 'Science',
          user: 'Einstein'
        },
        {
          passCategory: {categoryName: 'E-mails'},
          system: 'Music',
          user: 'Mozart'
        }
      ]
    });
  });

  it ('Pass notes determination', () => {
    service.setSelectedPassCategory({categoryName: 'PINS'});
    expect(service.getPassNotes().length).toBe(3);
    service.setSelectedPassCategory({categoryName: 'E-mails'});
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
