import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { AuthActions } from '.';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      tap(console.log),
      switchMap(({ username, password }) =>
        this.authService.login({ username, password }).pipe(
          map(() => AuthActions.loginSuccess()),
          tap(() => this.router.navigateByUrl('/home')),
          catchError((error) => of(AuthActions.loginFailure({ error }))),
        ),
      ),
    );
  });

  checkIfLoggedIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.checkIfLoggedIn),
      switchMap(() =>
        of(false).pipe(
          map((isLoggedIn) =>
            AuthActions.checkIfLoggedInSuccess({ isLoggedIn }),
          ),
          tap(() => this.router.navigateByUrl('/home')),
          catchError((error) =>
            of(AuthActions.checkIfLoggedInFailure({ error })),
          ),
        ),
      ),
    );
  });

  addSalesManager$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.addSalesManager),
      switchMap(({ salesManager }) =>
        this.authService.addSalesManager(salesManager).pipe(
          map(() => AuthActions.addSalesManagerSuccess({ salesManager })),
          catchError((error) =>
            of(AuthActions.addSalesManagerFailure({ error })),
          ),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
  ) {}
}
