import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalError } from './critical-error';

describe('CriticalError', () => {
  let component: CriticalError;
  let fixture: ComponentFixture<CriticalError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriticalError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriticalError);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
