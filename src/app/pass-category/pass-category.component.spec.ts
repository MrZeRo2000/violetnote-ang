import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassCategoryComponent } from './pass-category.component';
import {PassDataService} from '../pass-data.service';

class MockPassDataService extends PassDataService {
  constructor() {
    super();
    this.setPassData({passCategoryList: [{categoryName: 'TestCategoryName'}]});
  }
}

describe('PassCategoryComponent', () => {
  let component: PassCategoryComponent;
  let fixture: ComponentFixture<PassCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassCategoryComponent ],
      providers: [{provide: PassDataService, useClass: MockPassDataService}]
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
