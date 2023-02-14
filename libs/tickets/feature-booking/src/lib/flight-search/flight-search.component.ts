import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { CityPipe } from '@flight-demo/shared/ui-common';
import {
  Flight,
  ticketsActions,
  ticketsFeature,
} from '@flight-demo/tickets/domain';
import { FlightCardComponent } from '../flight-card/flight-card.component';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    CityPipe,
    FlightCardComponent,
    LetModule,
  ],
})
export class FlightSearchComponent {
  #store = inject(Store);
  from = 'London';
  to = 'Paris';
  flights$ = this.#store.select(ticketsFeature.selectFlights);

  basket: Record<number, boolean> = {
    3: true,
    5: true,
  };

  search(): void {
    if (!this.from || !this.to) {
      return;
    }

    this.#store.dispatch(
      ticketsActions.flightsLoad({
        from: this.from,
        to: this.to,
      })
    );
  }

  delay(flight: Flight): void {
    this.#store.dispatch(
      ticketsActions.flightUpdate({
        flight: {
          ...flight,
          date: addMinutesToDate(flight.date, 5).toISOString(),
          delayed: true,
        },
      })
    );
  }
}

export const addMinutesToDate = (
  date: Date | string,
  minutes: number
): Date => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Date(dateObj.getTime() + minutes * 60 * 1_000);
};
