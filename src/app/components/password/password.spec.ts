import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { Password } from './password';

describe('Password', () => {
  let component: Password;
  let fixture: ComponentFixture<Password>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Password],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Password);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
