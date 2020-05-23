import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export enum EditButtonType {
  BT_ADD,
  BT_DELETE,
  BT_EDIT,
  BT_UP,
  BT_DOWN
}

@Component({
  selector: 'app-edit-panel',
  templateUrl: './edit-panel.component.html',
  styleUrls: ['./edit-panel.component.scss']
})
export class EditPanelComponent implements OnInit {
  EditButtonType = EditButtonType;

  @Input()
  selectedItem: any;

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
