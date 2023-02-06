// src/app/city.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  formatName(value: string, format: 'short' | 'long'): string {
    let short;
    let long;

    switch (value) {
      case 'Graz':
        short = 'GRZ';
        long = 'Flughafen Graz Thalerhof';
        break;
      case 'Hamburg':
        short = 'HAM';
        long = 'Airport Hamburg Fulsbüttel Helmut Schmidt';
        break;
      default:
        short = long = value;
      // Custom formatting not possible ...
    }

    if (format === 'long') {
      return long;
    }

    return short;
  }
}
