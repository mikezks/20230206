import { JsonPipe, NgIf, NgStyle } from '@angular/common';
import { inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// src/app/flight-booking/flight-edit/flight-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Flight } from '../flight';

@Component({
  selector: 'app-flight-edit',
  standalone: true,
  imports: [
    NgStyle,
    NgIf,
    JsonPipe, // or CommonModule
    ReactiveFormsModule,
  ],
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.scss'],
})
export class FlightEditComponent implements OnInit {
  id = 0;
  showDetails = false;
  carColor = '';
  editForm = inject(NonNullableFormBuilder).group(
    {
      id: [0],
      from: ['Graz', [Validators.required, Validators.minLength(5)]],
      to: ['Hamburg'],
      date: [new Date().toISOString()],
      delayed: [false],
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

    this.editForm.valueChanges.subscribe(console.log);
    // this.editForm.updateValueAndValidity();
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

  reset(): void {
    this.editForm.reset();
  }
}
