import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() inputSearch: string;

  constructor() { }

  ngOnInit() {
  }

  onSubmitSearch(event) {
    console.log('input search:' + this.inputSearch);
  }
}
