import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PassNoteViewComponent } from './pass-note-view.component';
import {BsModalRef, BsModalService, ModalModule} from 'ngx-bootstrap/modal';

class MockModalService {
  public hide(): void { }
}

class MockPassNote {
  system = 'System';
  user = 'User';
  password = 'Password';
  url = 'Url';
  info = 'Info';
  public getURL(): string {
    return null;
  }
}

describe('PassNoteViewComponent', () => {
  let component: PassNoteViewComponent;
  let fixture: ComponentFixture<PassNoteViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassNoteViewComponent ],
      providers: [
        {provide: BsModalRef, useClass: MockModalService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassNoteViewComponent);
    component = fixture.componentInstance;
    component.passNote = new MockPassNote();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
