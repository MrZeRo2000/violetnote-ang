import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownFilterComponent } from './drop-down-filter.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';

describe('DropDownFilterComponent', () => {
  let component: DropDownFilterComponent;
  let fixture: ComponentFixture<DropDownFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownFilterComponent ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        BsDropdownModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
