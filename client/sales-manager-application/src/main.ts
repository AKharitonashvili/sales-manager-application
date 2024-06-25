import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, provideState, provideStore } from '@ngrx/store';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './app/shared/stores/auth/auth.effects';
import { authReducer } from './app/shared/stores/auth/auth.reducers';
import { AUTH_FEATURE_KEY } from './app/shared/stores/auth/auth.selectors';
import { ProductsEffects } from './app/shared/stores/products/products.effects';
import { productReducer } from './app/shared/stores/products/products.reducers';
import { PRODUCTS_FEATURE_KEY } from './app/shared/stores/products/products.selectors';
import { SalesManagersEffects } from './app/shared/stores/sales-managers/sales-managers.effects';
import { salesManagerReducer } from './app/shared/stores/sales-managers/sales-managers.reducers';
import { SALES_MANAGERS_FEATURE_KEY } from './app/shared/stores/sales-managers/sales-managers.selectors';
import { JwtModule } from '@auth0/angular-jwt';
import { TokenInterceptor } from '@app/shared/interceptors/token.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, '../assets/i18n/', '.json');
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      BrowserAnimationsModule,
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
    provideHttpClient(),
    importProvidersFrom([
      JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem('token'),
        },
      }),
    ]),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
        defaultLanguage: 'en-US',
      }),
    ),
  ],
}).catch((err) => console.error(err));
