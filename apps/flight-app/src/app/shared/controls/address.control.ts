import { Component, DoCheck, inject } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

export interface Address {
  street: string;
  number: string | string[];
  zip: string;
  city: string;
  country: string;
}

export interface ExternalAddress extends Address {
  number: string | string[];
}

@Component({
  selector: 'app-address-control',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="addressForm">
      <div class="form-group">
        <label>Street:</label>
        <input formControlName="street" class="form-control" />
      </div>
      <div class="form-group">
        <label>Number:</label>
        <input formControlName="number" class="form-control" />
      </div>
      <div class="form-group">
        <label>Zip code:</label>
        <input formControlName="zip" class="form-control" />
      </div>
      <div class="form-group">
        <label>City:</label>
        <input formControlName="city" class="form-control" />
      </div>
      <div class="form-group">
        <label>Country:</label>
        <input formControlName="country" class="form-control" />
      </div>

      <div class="form-group">
        <button
          (click)="updateAddress()"
          [disabled]="!addressForm.valid"
          class="btn btn-default"
        >
          Update address
        </button>
      </div>
    </form>
  `,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class AddressControl implements ControlValueAccessor, DoCheck {
  addressForm = inject(NonNullableFormBuilder).group({
    street: [''],
    number: [''],
    zip: [''],
    city: [''],
    country: [''],
  });
  #ngControl = inject(NgControl);
  onChangeFn: ((address: ExternalAddress) => void) | undefined;
  onTouchedFn: (() => void) | undefined;
  untouched = true;

  constructor() {
    this.#ngControl.valueAccessor = this;
  }

  ngDoCheck(): void {
    if (this.untouched && this.addressForm.touched) {
      this.onTouchedFn?.();
      this.untouched = false;
    }
  }

  writeValue(address: Address): void {
    this.addressForm.patchValue({
      ...address,
      number:
        typeof address.number === 'string'
          ? address.number
          : address.number.join('/'),
    });
  }

  registerOnChange(fn: (address: Address) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    console.log(isDisabled);
    Object.values(this.addressForm.controls).forEach((control) =>
      isDisabled ? control.disable() : control.enable()
    );
  }

  updateAddress(): void {
    const externalAddress: ExternalAddress = {
      ...this.addressForm.getRawValue(),
      number: this.addressForm.getRawValue().number.split('/'),
    };
    this.onChangeFn?.(externalAddress);
  }
}
