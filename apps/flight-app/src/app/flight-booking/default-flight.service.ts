import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.tokens';
import { Flight } from './flight';
import { FlightService } from './flight.service';

export function injectHttp(): HttpClient {
  return inject(HttpClient);
}

@Injectable()
export class DefaultFlightService implements FlightService {
  // We will refactor this to an observable in a later exercise!
  flights: Flight[] = [];
  #http = injectHttp();
  #baseUrl = inject(BASE_URL);

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
    const url = this.#baseUrl + 'flight';

    const headers = new HttpHeaders().set('Accept', 'application/json');

    const params = new HttpParams().set('from', from).set('to', to);

    return this.#http.get<Flight[]>(url, { headers, params });
  }

  findById(id: number): Observable<Flight> {
    const url = 'http://www.angular.at/api/flight';
    const params = new HttpParams().set('id', id);
    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.#http.get<Flight>(url, { params, headers });
  }

  delay(): void {
    const date = new Date(this.flights[0].date);
    date.setTime(date.getTime() + 1000 * 60 * 15);
    this.flights[0].date = date.toISOString();
  }
}
