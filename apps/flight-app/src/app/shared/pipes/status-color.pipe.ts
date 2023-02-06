// src/app/status-color.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor',
  standalone: true,
  pure: true,
})
export class StatusColorPipe implements PipeTransform {
  transform(delayed: boolean | undefined): string {
    if (delayed) {
      return 'darkred';
    } else {
      return 'darkgreen';
    }
  }
}
