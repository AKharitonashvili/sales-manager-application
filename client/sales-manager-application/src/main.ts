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
import { PRODUCTS_FEATURE_KEY } from './app/stores/products/products.selectors';
import { productReducer } from './app/stores/products/products.reducers';
import { ProductsEffects } from './app/stores/products/products.effects';
import { SALES_MANAGERS_FEATURE_KEY } from './app/stores/sales-managers/sales-managers.selectors';
import { salesManagerReducer } from './app/stores/sales-managers/sales-managers.reducers';
import { SalesManagersEffects } from './app/stores/sales-managers/sales-managers.effects';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
    ),
    provideStore(),
    provideState({ name: AUTH_FEATURE_KEY, reducer: authReducer }),
    provideEffects([AuthEffects]),
    provideState({ name: PRODUCTS_FEATURE_KEY, reducer: productReducer }),
    provideEffects([ProductsEffects]),
    provideState({
      name: SALES_MANAGERS_FEATURE_KEY,
      reducer: salesManagerReducer,
    }),
    provideEffects([SalesManagersEffects]),
  ],
}).catch((err) => console.error(err));
