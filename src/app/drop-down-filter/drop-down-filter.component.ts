import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export class FilterItem {
  constructor(public value: string, public isSelected: boolean = true) {
  }

  public static getFilterItemValues(items: Array<FilterItem>): Array<string> {
    return items.filter(value => value.isSelected).map(value => value.value);
  }
}

@Component({
  selector: 'app-drop-down-filter',
  templateUrl: './drop-down-filter.component.html',
  styleUrls: ['./drop-down-filter.component.scss']
})
export class DropDownFilterComponent implements OnInit {

  @Input()
  filterItems: Array<FilterItem>

  @Output()
  filterChanged = new EventEmitter<Array<FilterItem>>();

  constructor() { }

  ngOnInit(): void {
  }

  dropDownAllClick(event: any) {
    event.preventDefault();
    this.filterItems.forEach(value => value.isSelected = true);
  }


  dropDownClick(event: any, filterItem: FilterItem) {
    event.preventDefault();
    if (event.ctrlKey) {
      this.filterItems.forEach(v => v.isSelected = v.value === filterItem.value);
      this.filterChanged.emit(this.filterItems);
    } else if (!filterItem.isSelected || (this.filterItems.filter(v => v.isSelected)).length > 1) {
      filterItem.isSelected = !filterItem.isSelected;
      this.filterChanged.emit(this.filterItems);
    }
  }

}
