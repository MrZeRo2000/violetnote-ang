import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {BsModalService, PaginationComponent, PaginationConfig} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import { PassNoteComponent } from './pass-note.component';
import {PassDataService} from '../services/pass-data.service';
import {Injectable} from '@angular/core';


class MockModalService {
  public hide(): void { }
}

@Injectable()
class MockPassDataService extends PassDataService {
  constructor() {
    super();
    this.setPassData({
      passCategoryList: [{categoryName: 'TestCategoryName'}],
      passNoteList: [{passCategory: {categoryName: 'TestCategoryName'}, user: 'TestUser', system: 'TestSystem'}]
    });
  }
}

describe('PassNoteComponent', () => {
  let component: PassNoteComponent;
  let fixture: ComponentFixture<PassNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassNoteComponent, PaginationComponent ],
      imports: [FormsModule],
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
