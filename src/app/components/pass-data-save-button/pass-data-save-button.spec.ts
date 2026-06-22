import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { PassDataSaveButton } from './pass-data-save-button';

describe('PassDataSaveButton', () => {
  let component: PassDataSaveButton;
  let fixture: ComponentFixture<PassDataSaveButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassDataSaveButton],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassDataSaveButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
