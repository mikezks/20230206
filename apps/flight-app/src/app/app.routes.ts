import { Route } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { FLIGHT_BOOKING_ROUTES } from './flight-booking/flight-booking.routes';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: '',
    loadChildren: () => FLIGHT_BOOKING_ROUTES,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
