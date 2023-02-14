import { TicketsEffects } from './../../../domain/src/lib/+state/effects';
import { Routes } from '@angular/router';
import { ticketsFeature } from '@flight-demo/tickets/domain';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { FlightBookingComponent } from './flight-booking.component';
import { FlightEditReactiveComponent } from './flight-edit-reactive/flight-edit-reactive.component';
import { FlightLookupComponent } from './flight-lookup/flight-lookup.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';

export const FLIGHT_BOOKING_ROUTES: Routes = [
  {
    path: '',
    component: FlightBookingComponent,
    children: [
      {
        path: 'flight-lookup',
        component: FlightLookupComponent,
      },
      {
        path: 'flight-search',
        component: FlightSearchComponent,
      },
      {
        path: 'flight-edit/:id',
        component: FlightEditComponent,
      },
      {
        path: 'passenger-search',
        component: PassengerSearchComponent,
      },
    ],
    providers: [provideState(ticketsFeature), provideEffects(TicketsEffects)],
  },
];

export default FLIGHT_BOOKING_ROUTES;
