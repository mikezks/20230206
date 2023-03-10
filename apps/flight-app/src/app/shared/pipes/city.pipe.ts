// src/app/city.pipe.ts

import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { CityService } from './city.service';

@Pipe({
  name: 'city',
  standalone: true,
  pure: true,
})
export class CityPipe implements PipeTransform, OnDestroy {
  constructor(private cityService: CityService) {}

  ngOnDestroy(): void {
    console.log('See you later, bye!');
  }

  transform(
    value: string | undefined,
    format: 'long' | 'short'
  ): string | undefined {
    if (typeof value === 'undefined') {
      return value;
    }

    return this.cityService.formatName(value, format);
  }
}
