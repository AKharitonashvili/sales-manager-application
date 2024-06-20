import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { AuthActions } from '.';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(() =>
        of([]).pipe(
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

  constructor(
    private actions$: Actions,
    private router: Router,
  ) {}
}
