import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { delay, Observable } from 'rxjs';
import { Flight } from '../flight';
import { FlightService } from '../flight.service';

@Injectable({
  providedIn: 'root',
})
export class FlightResolver implements Resolve<Flight> {
  #flightService = inject(FlightService);

  resolve(route: ActivatedRouteSnapshot): Observable<Flight> {
    const id = +(route.paramMap.get('id') || 0);
    return this.#flightService
      .findById(id)
      .pipe
      // delay(5_000)
      ();
  }
}
