import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassNoteComponent } from './pass-note.component';
import {BsModalService, PaginationComponent, PaginationConfig} from 'ngx-bootstrap';
import {PassDataService} from '../services/pass-data.service';

class MockModalService {
  public hide(): void { }
}

class MockPassDataService extends PassDataService {
  constructor() {
    super();
    this.setPassData({
      passCategoryList: [{categoryName: 'TestCategoryName'}],
      passNoteList: [{passCategory: {categoryName: 'TestCategoryName'}}]
    });
  }
}

describe('PassNoteComponent', () => {
  let component: PassNoteComponent;
  let fixture: ComponentFixture<PassNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassNoteComponent, PaginationComponent ],
      providers: [
        {provide: BsModalService, useClass: MockModalService},
        {provide: PassDataService, useClass: MockPassDataService},
        {provide: PaginationConfig, useValue: {
          boundaryLinks: true,
            firstText: 'First',
            previousText: '&lsaquo;',
            nextText: '&rsaquo;',
            lastText: 'Last',
            maxSize: 1 }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
