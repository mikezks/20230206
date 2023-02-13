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
    })
  ),
});
