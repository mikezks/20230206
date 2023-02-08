import { inject } from '@angular/core';
// src/app/default-flight.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../app-runtime.config';
import { DefaultFlightService } from './default-flight.service';
import { DummyFlightService } from './dummy-flight.service';
import { Flight } from './flight';

@Injectable({
  providedIn: 'root',
  useFactory: () => {
    const configService = inject(ConfigService);
    if (configService.config.value.flightServiceType === 'dummy') {
      return new DummyFlightService();
    }
    return new DefaultFlightService();
  },
})
export abstract class FlightService {
  flights: Flight[] = [];
  abstract load(from: string, to: string): void;
  abstract find(from: string, to: string): Observable<Flight[]>;
  abstract findById(id: number): Observable<Flight>;
  abstract delay(): void;
}
