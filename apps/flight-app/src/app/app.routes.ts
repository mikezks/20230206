import { inject } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { AuthService } from './shared/auth/auth.service';

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
    canActivate: [AuthGuard],
  },
  {
    path: 'flight-booking',
    loadChildren: () =>
      import('./flight-booking/flight-booking.routes').then(
        (esm) => esm.FLIGHT_BOOKING_ROUTES
      ),
    canMatch: [
      () =>
        !!inject(AuthService).username ||
        inject(Router).createUrlTree(['/home', { needsLogin: true }]),
    ],
  },
  {
    path: 'basket',
    component: BasketComponent,
    outlet: 'aux',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
