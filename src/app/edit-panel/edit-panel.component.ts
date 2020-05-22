import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-panel',
  templateUrl: './edit-panel.component.html',
  styleUrls: ['./edit-panel.component.scss']
})
export class EditPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onAddClick(event: any) {
    event.preventDefault();
  }

  onDeleteClick(event: any) {
    event.preventDefault();
  }

  onEditClick(event: any) {
    event.preventDefault();
  }

}
