import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyValueComponent } from './copy-value.component';
import {PopoverModule} from 'ngx-bootstrap/popover';

describe('CopyPasswordPanelComponent', () => {
  let component: CopyValueComponent;
  let fixture: ComponentFixture<CopyValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyValueComponent ],
      imports: [PopoverModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
