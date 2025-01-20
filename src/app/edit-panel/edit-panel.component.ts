import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export enum EditButtonType {
  BT_ADD,
  BT_DELETE,
  BT_EDIT,
  BT_UP,
  BT_DOWN,
  BT_DUPLICATE
}

@Component({
    selector: 'app-edit-panel',
    templateUrl: './edit-panel.component.html',
    styleUrls: ['./edit-panel.component.scss'],
    standalone: false
})
export class EditPanelComponent implements OnInit {
  EditButtonType = EditButtonType;

  @Input()
  selectedItem: any;

  @Input()
  hideAdd: boolean;

  @Input()
  showDuplicate: boolean;

  @Input()
  disableAdd: boolean;

  @Input()
  disableDelete: boolean;

  @Output()
  editButtonClick: EventEmitter<EditButtonType> = new EventEmitter<EditButtonType>();

  constructor() { }

  ngOnInit(): void {
  }

  onButtonClick(event: any, editButtonType: EditButtonType) {
    event.preventDefault();
    this.editButtonClick.emit(editButtonType);
  }

}
