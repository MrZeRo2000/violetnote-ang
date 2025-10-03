import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyUserPasswordPanel } from './copy-user-password-panel';

describe('CopyUserPasswordPanel', () => {
  let component: CopyUserPasswordPanel;
  let fixture: ComponentFixture<CopyUserPasswordPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyUserPasswordPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopyUserPasswordPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
