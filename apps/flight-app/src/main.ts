import { BASE_URL } from './app/app.tokens';
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { provideInitConfig } from './app/app-runtime.config';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    provideInitConfig(),
  ],
}).catch((err) => console.error(err));
