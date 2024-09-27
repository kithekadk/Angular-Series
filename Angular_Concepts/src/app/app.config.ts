import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ProductEffects } from './store/effects/product.effects';
import { productReducer } from './store/reducers/product.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),
    provideStore({ products: productReducer }), // Register the product reducer
    provideEffects([ProductEffects]), // Register the effects
    provideStoreDevtools({ maxAge: 25, logOnly: false }), provideHttpClient(withFetch()), provideAnimationsAsync()]
};
