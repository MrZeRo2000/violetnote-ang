import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component, computed,
  DestroyRef,
  ElementRef, forwardRef,
  inject, Injector, signal,
  viewChildren
} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule, ValidationErrors, Validator,
  Validators
} from '@angular/forms';
import {Attribute} from '../../models/pass-data';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {PassDataSearchService} from '../../services/pass-data-search-service';


type AttributeFormGroup = FormGroup<{
  name: FormControl<string>;
  value: FormControl<string>;
}>;

@Component({
  selector: 'app-attributes-form',
  imports: [
    MatLabel,
    MatInput,
    MatFormField,
    MatIcon,
    MatIconButton,
    ReactiveFormsModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatOption
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './attributes-form.html',
  styleUrl: './attributes-form.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AttributesForm),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AttributesForm),
      multi: true,
    },
  ],
})
export class AttributesForm implements ControlValueAccessor, Validator {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);
  private readonly passDataSearchService = inject(PassDataSearchService);

  private onChange: (value: Attribute[]) => void = () => {};
  private onTouched: () => void = () => {};
  private onValidatorChange: () => void = () => {};
  private touched = false;

  readonly attributes: FormArray<AttributeFormGroup> = this.fb.array<AttributeFormGroup>([]);

  readonly nameInputs = viewChildren<ElementRef<HTMLInputElement>>('nameInput');

  readonly form = this.fb.group({
    attributes: this.attributes,
  });

  trackByIndex = (index: number): number => index;

  searchOptionsSignal = this.passDataSearchService.searchAttributeStringsSignal();

  activeInput = signal('');

  filteredOptions = computed(() => {
    const term = this.activeInput().trim().toLowerCase();
    if (term.length === 0) {
      return [];
    }
    const existingNames = new Set(this.getSanitizedValue().map(value => value.name.toLowerCase()));
    return  this.searchOptionsSignal().filter(o => o.toLowerCase().includes(term) && !existingNames.has(o));
  });

  constructor() {
    this.attributes.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.onChange(this.getSanitizedValue());
        this.onValidatorChange();
      });

    this.attributes.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.onValidatorChange();
      });
  }

  validate(_: AbstractControl): ValidationErrors | null {
    const errors: ValidationErrors = {};

    if (this.hasAnyIncompleteRow()) {
      errors['incompleteItems'] = true;
    }

    if (this.hasDuplicateNames()) {
      errors['duplicateNames'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  writeValue(value: Attribute[] | null): void {
    this.attributes.clear({ emitEvent: false });

    for (const item of value ?? []) {
      this.attributes.push(this.createAttributeGroup(item), { emitEvent: false });
    }

    this.attributes.updateValueAndValidity({ emitEvent: false });
  }

  registerOnChange(fn: (value: Attribute[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.attributes.disable({ emitEvent: false });
    } else {
      this.attributes.enable({ emitEvent: false });
    }
  }

  add(initial?: Partial<Attribute>): void {
    this.attributes.push(this.createAttributeGroup(initial));
    this.markAsTouched();
    this.onChange(this.getSanitizedValue());
    this.onValidatorChange();

    afterNextRender(() => {
      const lastInput = this.nameInputs().at(-1)?.nativeElement;
      lastInput?.focus();
      lastInput?.select();
    }, { injector: this.injector });
  }

  delete(index: number): void {
    this.attributes.removeAt(index);
    this.markAsTouched();
    this.onChange(this.getSanitizedValue());
    this.onValidatorChange();

    afterNextRender(() => {
      const lastInput = this.nameInputs().at(-1)?.nativeElement;
      lastInput?.focus();
      lastInput?.select();
    }, { injector: this.injector });
  }

  private createAttributeGroup(value?: Partial<Attribute>): AttributeFormGroup {
    return this.fb.nonNullable.group({
      name: this.fb.nonNullable.control(value?.name ?? '', Validators.required),
      value: this.fb.nonNullable.control(value?.value ?? '', Validators.required),
    });
  }


  private getSanitizedValue(): Attribute[] {
    return this.attributes.getRawValue().map(item => ({
      name: item.name,
      value: item.value,
    }));
  }

  private hasAnyIncompleteRow(): boolean {
    return this.attributes.controls.some(group => group.invalid);
  }

  private hasDuplicateNames(): boolean {
    return this.getDuplicateIndexes().size > 0;
  }

  private getDuplicateIndexes(): Set<number> {
    const map = new Map<string, number[]>();

    this.attributes.controls.forEach((group, index) => {
      const normalized = group.controls.name.value.trim().toLowerCase();
      if (!normalized) return;

      const indexes = map.get(normalized) ?? [];
      indexes.push(index);
      map.set(normalized, indexes);
    });

    const duplicates = new Set<number>();

    for (const indexes of map.values()) {
      if (indexes.length > 1) {
        indexes.forEach(i => duplicates.add(i));
      }
    }

    return duplicates;
  }

  markAsTouched(): void {
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }

  onAddClick(): void {
    this.add()
  }

  onDeleteClick(index: number): void {
    this.delete(index);
  }
}
