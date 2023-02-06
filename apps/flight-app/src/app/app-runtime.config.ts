import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, Injectable, Provider } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

export interface Config {
  flightServiceType: 'default' | 'dummy';
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config = new BehaviorSubject<Config>({
    flightServiceType: 'default',
  });
}

export function provideInitConfig(): Provider {
  return {
    provide: APP_INITIALIZER,
    useFactory: (http: HttpClient, cfgService: ConfigService) => () =>
      http
        .get<Config>('./assets/runtime/config.json')
        .pipe(tap((config) => cfgService.config.next(config))),
    deps: [HttpClient, ConfigService],
    multi: true,
  };
}
