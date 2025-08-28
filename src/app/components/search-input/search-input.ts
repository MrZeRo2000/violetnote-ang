import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {PassDataService} from '../../services/pass-data-service';
import {PassDataSearchService} from '../../services/pass-data-search-service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged, map,
  Observable,
  of,
  startWith,
  switchMap,
  tap
} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteTrigger, MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-input',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatIconButton,
  ],
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss'
})
export class SearchInput implements OnInit {
  @ViewChild('autoTrigger', { read: MatAutocompleteTrigger }) autocompleteTrigger?: MatAutocompleteTrigger;

  private router = inject(Router);
  private fb = inject(FormBuilder)
  private passDataService = inject(PassDataService)
  private passDataSearchService = inject(PassDataSearchService);

  passData$ = this.passDataService.getPassData()

  searchForm = this.fb.group({
    searchControl: ['', Validators.min(2)],
  })

  searchValueSublect = new BehaviorSubject<string | null>(null);
  searchValueAction$ = this.searchValueSublect.asObservable().pipe(
    map(v => v && v.length > 1 ? v : null),
    tap(v => this.passDataSearchService.search(v))
  )

  searchResultAction$ = this.passDataSearchService.searchResultAction$.pipe(
    distinctUntilChanged(),
    tap((v) => {
      if (v != null) {
        console.log('Ready to navigate');
        setTimeout(() => {
          this.router.navigate(['/search']).then();
        }, 0)
        //this.router.navigate(['/search']).then();
      } else {
        this.router.navigate(['/main']).then();
      }
    })
  )

  searchOptions$: Observable<Array<string>> | undefined;

  ngOnInit(): void {
    this.searchOptions$ = this.searchForm.valueChanges.pipe(
      startWith(''),
      map(v => (typeof v === 'object' && v !== null && 'searchControl' in v) ? v.searchControl as string : ''),
      map(v => v ? v : ' '),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(v => {
        if (v.length < 2) {
          return of([])
        } else {
          return this.passDataSearchService.searchStrings(v)
        }
      }),
    )
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    console.log(`Search option selected: ${event.option.value}`);
    this.searchValueSublect.next(event.option.value)
  }

  onClear(event: any): void {
    event.stopPropagation();
    this.searchForm.patchValue({searchControl: undefined});
    this.searchValueSublect.next(null)
  }

  onSearch(event: any): void {
    event.stopPropagation();
    event.stopPropagation();
    if (this.searchForm.valid) {
      this.searchValueSublect.next(this.searchForm.value.searchControl || null);
      this.autocompleteTrigger?.closePanel();
    }
  }
}
