import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributesForm } from './attributes-form';

describe('AttributesForm', () => {
  let component: AttributesForm;
  let fixture: ComponentFixture<AttributesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributesForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributesForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
