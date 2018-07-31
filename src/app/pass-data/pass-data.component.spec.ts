import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassDataComponent } from './pass-data.component';
import {PassCategoryComponent} from '../pass-category/pass-category.component';
import {PassNoteComponent} from '../pass-note/pass-note.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {PaginationComponent} from 'ngx-bootstrap';

describe('PassDataComponent', () => {
  let component: PassDataComponent;
  let fixture: ComponentFixture<PassDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassDataComponent, PassCategoryComponent, PassNoteComponent, PaginationComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

