import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyPasswordPanelComponent } from './copy-password-panel.component';
import {PopoverModule} from 'ngx-bootstrap/popover';

describe('CopyPasswordPanelComponent', () => {
  let component: CopyPasswordPanelComponent;
  let fixture: ComponentFixture<CopyPasswordPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyPasswordPanelComponent ],
      imports: [PopoverModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyPasswordPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
