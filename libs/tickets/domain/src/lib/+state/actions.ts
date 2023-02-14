import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Flight } from '../entities/flight';

export const ticketsActions = createActionGroup({
  source: 'tickets',
  events: {
    'flights load': props<{ from: string; to: string }>(),
    'flights loaded': props<{ flights: Flight[] }>(),
    'flights loaded error': props<{ error: unknown }>(),
    'flight update': props<{ flight: Flight }>(),
    'flights clear': emptyProps(),
  },
});
