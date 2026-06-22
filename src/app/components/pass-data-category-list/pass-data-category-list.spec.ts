import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { PassDataCategoryList } from './pass-data-category-list';

describe('PassDataCategoryList', () => {
  let component: PassDataCategoryList;
  let fixture: ComponentFixture<PassDataCategoryList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassDataCategoryList],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassDataCategoryList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
