import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { FlightService } from '../infrastructure/flight.service';
import { ticketsActions } from './actions';

@Injectable({
  providedIn: 'root',
})
export class TicketsEffects {
  #actions = inject(Actions);
  #flightService = inject(FlightService);

  loadFlights = createEffect(
    () =>
      this.#actions.pipe(
        ofType(ticketsActions.flightsLoad),
        switchMap((action) =>
          this.#flightService.find(action.from, action.to).pipe(
            map((flights) => ticketsActions.flightsLoaded({ flights })),
            catchError((err) =>
              of(ticketsActions.flightsLoadedError({ error: err }))
            )
          )
        )
      ) /* , { dispatch: false } */
  );
}
