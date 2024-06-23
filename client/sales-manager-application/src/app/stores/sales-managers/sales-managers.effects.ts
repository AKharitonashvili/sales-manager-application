import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { salesManagersActions } from '.';
import { salesManagersMock } from 'src/app/shared/mock/sales-managers.mock';
import { productsSoldByProducts } from 'src/app/shared/mock/products.mock';

@Injectable()
export class SalesManagersEffects {
  getSalesManagers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(salesManagersActions.loadSalesManagers),
      switchMap(() =>
        of(salesManagersMock).pipe(
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
        of(null).pipe(
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

  editSalesManager$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(salesManagersActions.editSalesManager),
      switchMap(({ salesManager }) =>
        of(null).pipe(
          map(() =>
            salesManagersActions.editSalesManagerSuccess({ salesManager }),
          ),
          catchError((error) =>
            of(salesManagersActions.editSalesManagerFailure({ error })),
          ),
        ),
      ),
    );
  });

  deleteSalesManager$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(salesManagersActions.deleteSalesManager),
      switchMap(({ id }) =>
        of(null).pipe(
          map(() => salesManagersActions.deleteSalesManagerSuccess({ id })),
          catchError((error) =>
            of(salesManagersActions.deleteSalesManagerFailure({ error })),
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

  constructor(private actions$: Actions) {}
}
