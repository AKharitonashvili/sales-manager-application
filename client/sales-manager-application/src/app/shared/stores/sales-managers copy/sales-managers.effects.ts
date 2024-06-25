import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { salesManagersActions } from '.';
import { salesManagersMock } from 'src/app/shared/mock/sales-managers.mock';
import { productsSoldByProducts } from 'src/app/shared/mock/products.mock';
import { SalesManagersService } from 'src/app/services/sales-managers/sales-managers.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()
export class SalesManagersEffects {
  getSalesManagers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(salesManagersActions.loadSalesManagers),
      switchMap(() =>
        this.salesManagerService.getSalesManagers().pipe(
          map((salesManagers) =>
            salesManagersActions.loadSalesManagersSuccess({ salesManagers }),
          ),
          catchError((error) =>
            of(salesManagersActions.loadSalesManagersFailure({ error })),
          ),
        ),
      ),
    );
  });

  addSalesManager$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(salesManagersActions.addSalesManager),
      switchMap(({ salesManager }) =>
        this.authService.addSalesManager(salesManager).pipe(
          map(() =>
            salesManagersActions.addSalesManagerSuccess({ salesManager }),
          ),
          catchError((error) =>
            of(salesManagersActions.addSalesManagerFailure({ error })),
          ),
        ),
      ),
    );
  });

  getSoldProductsByMaanager$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(salesManagersActions.loadSoldProductsByManager),
      switchMap(() =>
        of(productsSoldByProducts).pipe(
          map((products) =>
            salesManagersActions.loadSoldProductsByManagerSuccess({ products }),
          ),
          catchError((error) =>
            of(
              salesManagersActions.loadSoldProductsByManagerFailure({ error }),
            ),
          ),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private salesManagerService: SalesManagersService,
    private authService: AuthService,
  ) {}
}
