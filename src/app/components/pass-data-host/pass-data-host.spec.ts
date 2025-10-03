import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassDataHost } from './pass-data-host';

describe('PassDataHost', () => {
  let component: PassDataHost;
  let fixture: ComponentFixture<PassDataHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassDataHost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassDataHost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
