import { BASE_URL } from './app/app.tokens';
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),

    provideHttpClient(),

    /* {
      provide: BASE_URL,
      useValue: ''
    } */
  ],
}).catch((err) => console.error(err));
