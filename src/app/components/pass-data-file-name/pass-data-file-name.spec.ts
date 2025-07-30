import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassDataFileName } from './pass-data-file-name';

describe('PassDataFileName', () => {
  let component: PassDataFileName;
  let fixture: ComponentFixture<PassDataFileName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassDataFileName]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassDataFileName);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
