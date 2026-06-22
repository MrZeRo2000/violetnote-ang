import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { CopyUserPasswordPanel } from './copy-user-password-panel';

describe('CopyUserPasswordPanel', () => {
  let component: CopyUserPasswordPanel;
  let fixture: ComponentFixture<CopyUserPasswordPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyUserPasswordPanel],
      providers: [provideZonelessChangeDetection()]
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
