import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, provideState, provideStore } from '@ngrx/store';
import { authReducer } from './app/stores/auth/auth.reducers';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { AuthEffects } from './app/stores/auth/auth.effects';
import { AUTH_FEATURE_KEY } from './app/stores/auth/auth.selectors';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
    ),
    provideState({ name: AUTH_FEATURE_KEY, reducer: authReducer }),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
  ],
}).catch((err) => console.error(err));
