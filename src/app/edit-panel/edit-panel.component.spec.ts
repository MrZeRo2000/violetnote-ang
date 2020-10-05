import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPanelComponent } from './edit-panel.component';
import {FontAwesomeIconsModule} from '../font-awesome-icons/font-awesome-icons.module';

describe('EditPanelComponent', () => {
  let component: EditPanelComponent;
  let fixture: ComponentFixture<EditPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPanelComponent ],
      imports: [FontAwesomeIconsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
