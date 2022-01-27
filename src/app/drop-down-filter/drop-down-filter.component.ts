import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export class FilterItem {
  constructor(public value: string, public isSelected: boolean = true) {
  }

  public static getFilterItemValues(items: Array<FilterItem>): Array<string> {
    return items?.filter(value => value.isSelected).map(value => value.value);
  }

  public static getSelectedFilterItems(items: Array<FilterItem>): number {
    return items?.reduce((a, c) => a + (c.isSelected ? 1 : 0), 0);
  }

  public static allSelected(items: Array<FilterItem>): boolean {
    return items?.length === FilterItem.getSelectedFilterItems(items);
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
    this.filterChanged.emit(this.filterItems);
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

  isFilterActive(): boolean {
    return this.filterItems && this.filterItems.length !== FilterItem.getSelectedFilterItems(this.filterItems);
  }

}
