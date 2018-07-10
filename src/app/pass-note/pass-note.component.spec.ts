import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassNoteComponent } from './pass-note.component';
import {BsModalService} from 'ngx-bootstrap';
import {PassDataService} from '../pass-data.service';
import {PassCategory} from '../pass-category';

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
      declarations: [ PassNoteComponent ],
      providers: [
        {provide: BsModalService, useClass: MockModalService},
        {provide: PassDataService, useClass: MockPassDataService}
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
