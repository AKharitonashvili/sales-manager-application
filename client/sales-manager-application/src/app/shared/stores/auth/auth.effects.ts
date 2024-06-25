import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { AuthActions, AuthSelectors } from '.';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ username, password }) =>
        this.authService.login({ username, password }).pipe(
          map(({ id }) => AuthActions.loginSuccess({ managerId: id })),
          tap(() => this.router.navigateByUrl('/home')),
          catchError(({ error }) => of(AuthActions.loginFailure({ error }))),
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
          catchError(({ error }) => {
            this.router.navigateByUrl('/login');
            return of(AuthActions.addSalesManagerFailure({ error }));
          }),
        ),
      ),
    );
  });

  userInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.userInfo),
      switchMap(() =>
        this.authService.userInfo(localStorage.getItem('token')!).pipe(
          map(({ managerID }) =>
            AuthActions.userInfoSuccess({ managerId: managerID }),
          ),
          tap(() => this.router.navigateByUrl('/home')),
          catchError(({ error }) => of(AuthActions.userInfoFailure({ error }))),
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
