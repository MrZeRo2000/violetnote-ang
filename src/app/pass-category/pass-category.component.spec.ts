import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassCategoryComponent } from './pass-category.component';
import {PassDataService} from '../services/pass-data.service';
import {Injectable} from '@angular/core';

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

describe('PassCategoryComponent', () => {
  let component: PassCategoryComponent;
  let fixture: ComponentFixture<PassCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassCategoryComponent ],
      providers: [
        {provide: PassDataService, useClass: MockPassDataService}
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
