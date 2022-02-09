import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyUserNamePasswordPanelComponent } from './copy-user-name-password-panel.component';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {FontAwesomeIconsModule} from '../font-awesome-icons/font-awesome-icons.module';

describe('CopyUserNamePasswordPanelComponent', () => {
  let component: CopyUserNamePasswordPanelComponent;
  let fixture: ComponentFixture<CopyUserNamePasswordPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyUserNamePasswordPanelComponent ],
      imports: [PopoverModule, FontAwesomeIconsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyUserNamePasswordPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
