import {Component, inject, OnInit} from '@angular/core';
import {PassDataService} from '../../services/pass-data-service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, Observable, of, startWith, switchMap, tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-search-input',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
  ],
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss'
})
export class SearchInput implements OnInit {
  fb = inject(FormBuilder)
  passDataService = inject(PassDataService)

  passData$ = this.passDataService.getPassData()

  searchForm = this.fb.group({
    searchControl: ['', Validators.min(2)],
  })

  searchOptions$: Observable<Array<string>> | undefined;

  ngOnInit(): void {
    this.searchOptions$ = this.searchForm.valueChanges.pipe(
      startWith(''),
      tap(v => {
        console.log(`Search action: ${JSON.stringify(v)}`);
      }),
      map(v => (typeof v === 'object' && v !== null && 'searchControl' in v) ? v.searchControl as string : ''),
      map(v => v ? v : ' '),
      tap(v => {
        console.log(`Search action after map: ${v}`);
      }),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(v => {
        if (v.length < 2) {
          return of([])
        } else {
          return this.passDataService.searchStrings(v)
        }
      }),
      tap(v => {
        console.log(`Search options: ${JSON.stringify(v)}`);
      })
    )
  }

}
