import { PersonSubformComponent } from './../../shared/controls/person.subform';
import {
  Address,
  AddressControl,
} from './../../shared/controls/address.control';
import { JsonPipe, NgIf, NgStyle } from '@angular/common';
import { inject } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// src/app/flight-booking/flight-edit/flight-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Flight } from '../flight';
import {
  validateCity,
  validateCityWithParams,
} from '../../shared/validation/city-validator';

@Component({
  selector: 'app-flight-edit',
  standalone: true,
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.scss'],
  imports: [
    NgStyle,
    NgIf,
    JsonPipe,
    ReactiveFormsModule,
    AddressControl,
    PersonSubformComponent,
  ],
})
export class FlightEditComponent implements OnInit {
  id = 0;
  showDetails = false;
  carColor = '';
  editForm = inject(NonNullableFormBuilder).group(
    {
      id: [0],
      from: [
        'Graz',
        [Validators.required, Validators.minLength(3), validateCity],
      ],
      to: [
        'Hamburg',
        [validateCityWithParams(['Graz', 'Hamburg', 'Amsterdam'])],
      ],
      date: [new Date().toISOString()],
      delayed: [false],
      address: [
        {
          street: '',
          number: '',
          zip: '',
          city: '',
          country: '',
        } as Address,
      ],
      person: new FormGroup({}),
    },
    { updateOn: 'change' }
  );
  #route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.#route.params.subscribe((p) => {
      this.editForm.patchValue({
        id: p['id'],
      });
      this.showDetails = p['showDetails'];
      this.carColor = p['carColor'];
    });

    this.editForm.controls.from.valueChanges.subscribe((value) =>
      console.log('From value', value)
    );

    this.editForm.valueChanges.subscribe(console.log);
  }

  save(): void {
    console.log('value', this.editForm.value);
    console.log('valid', this.editForm.valid);
    console.log('dirty', this.editForm.dirty);
    console.log('touched', this.editForm.touched);

    this.dispatch(this.editForm.getRawValue());
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch(flight: Flight): void {}

  toggleDisableAddress(): void {
    this.editForm.controls.address.enabled
      ? this.editForm.controls.address.disable()
      : this.editForm.controls.address.enable();
  }

  reset(): void {
    this.editForm.reset();
  }
}
