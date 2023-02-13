import { createFeature, createReducer, on } from '@ngrx/store';
import { Flight } from './../entities/flight';
import { ticketsActions } from './actions';

export interface TicketsState {
  flights: Flight[];
  basket: unknown;
  tickets: unknown;
}

export const initialState: TicketsState = {
  flights: [],
  basket: {},
  tickets: {},
};

export const ticketsFeature = createFeature({
  name: 'tickets',
  reducer: createReducer(
    initialState,

    on(ticketsActions.flightsLoaded, (state, action) => {
      return {
        ...state,
        flights: action.flights,
      };
    }),
    on(ticketsActions.flightUpdate, (state, action) => {
      const updated = action.flight;
      const flights = state.flights.map((f) =>
        f.id === updated.id ? updated : f
      );

      return {
        ...state,
        flights,
      };
    }),
    on(ticketsActions.flightsClear, (state) => {
      return {
        ...state,
        flights: [],
      };
    })
  ),
});
