// src/app/flight-search/flight-search.component.ts

import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flight } from '../flight';
import { FlightService } from '../flight.service';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { CityValidationDirective } from '../../shared/validation/city-validation.directive';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-flight-search',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    JsonPipe,
    FormsModule,
    FlightCardComponent,
    CityValidationDirective,
  ],
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
})
export class FlightSearchComponent implements OnInit {
  from = 'Hamburg';
  to = 'Graz';
  selectedFlight: Flight | null = null;
  delayFilter = false;

  get flights() {
    // We will refactor this to an observable in a later exercise!
    return this.flightService.flights;
  }

  basket: { [key: number]: boolean } = {
    3: true,
    5: true,
  };

  constructor(private flightService: FlightService) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngOnInit(): void {}

  search(): void {
    this.flightService.load(this.from, this.to);
  }

  select(f: Flight): void {
    this.selectedFlight = f;
  }

  delay(): void {
    this.flightService.delay();
  }
}
