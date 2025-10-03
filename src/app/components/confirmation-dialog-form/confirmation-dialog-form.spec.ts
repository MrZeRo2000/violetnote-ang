import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogForm } from './confirmation-dialog-form';

describe('ConfirmationDialogForm', () => {
  let component: ConfirmationDialogForm;
  let fixture: ComponentFixture<ConfirmationDialogForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationDialogForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
