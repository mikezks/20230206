import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Flight } from './flight';
import { FlightService } from './flight.service';

@Injectable()
export class DummyFlightService implements FlightService {
  flights: Flight[] = [];

  #getInitialFlights: () => Flight[] = () => [
    {
      id: 999,
      from: 'New York',
      to: 'LA',
      date: new Date().toISOString(),
      delayed: true,
    },
  ];

  load(from: string, to: string): void {
    this.find(from, to).subscribe({
      next: (flights) => {
        this.flights = flights;
      },
      error: (err) => {
        console.error('error', err);
      },
    });
  }
  find(from: string, to: string): Observable<Flight[]> {
    return of(this.#getInitialFlights());
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  delay(): void {}
}
