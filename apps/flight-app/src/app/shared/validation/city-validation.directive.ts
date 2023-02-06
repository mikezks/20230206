// src/app/shared/validation/city-validation.directive.ts

import { Directive } from '@angular/core';

// Add those imports:
import {
  Validator,
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';

@Directive({
  // Update selector:
  selector: 'input[appCity]',
  standalone: true,
  // Add provider:
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CityValidationDirective,
      multi: true,
    },
  ],
})
// Implement the interface Validator
// and therefore the method validate
export class CityValidationDirective implements Validator {
  public validate(c: AbstractControl): ValidationErrors {
    if (
      c.value === 'Graz' ||
      c.value === 'Hamburg' ||
      c.value === 'Frankfurt' ||
      c.value === 'Wien' ||
      c.value === 'Mallorca'
    ) {
      return {};
    }

    return {
      appCity: true,
    };
  }
}
