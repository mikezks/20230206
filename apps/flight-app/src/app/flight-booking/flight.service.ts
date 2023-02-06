// src/app/default-flight.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DummyFlightService } from './dummy-flight.service';
import { Flight } from './flight';

@Injectable({
  providedIn: 'root',
  useClass: DummyFlightService,
})
export abstract class FlightService {
  flights: Flight[] = [];
  abstract load(from: string, to: string): void;
  abstract find(from: string, to: string): Observable<Flight[]>;
  abstract delay(): void;
}
