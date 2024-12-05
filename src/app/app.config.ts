import {
  APP_INITIALIZER,
  ApplicationConfig,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => async () => {
        try {
          // Try to load the user from http call to the server
          // if some error happens, We catch this error and do nothing, so the app doesn't crash
          await authService.initializeUser();
        } catch (error) {
          // if there is an error, log it
          console.error('Failed to load user:', error);
        }
      },
      deps: [AuthService],
      multi: true,
    },
  ],
};
