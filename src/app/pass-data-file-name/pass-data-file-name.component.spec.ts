import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassDataFileNameComponent } from './pass-data-file-name.component';

describe('PassDataFileNameComponent', () => {
  let component: PassDataFileNameComponent;
  let fixture: ComponentFixture<PassDataFileNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassDataFileNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassDataFileNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
