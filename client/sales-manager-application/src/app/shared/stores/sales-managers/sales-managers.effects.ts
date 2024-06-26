import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { salesManagersActions } from '.';
import { productsSoldByProducts } from '../../mock/products.mock';
import { AuthService } from '../../services/auth/auth.service';
import { SalesManagersService } from '../../services/sales-managers/sales-managers.service';
import { CacheService } from '@app/shared/services/cache/cache.service';
import { ProductsActions } from '../products';
import { AuthActions } from '../auth';

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

  invalidateCache$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        salesManagersActions.editSalesManagerSuccess,
        salesManagersActions.deleteSalesManagerSuccess,
        salesManagersActions.invalidateCache,
        ProductsActions.sellProductSuccess,
        AuthActions.addSalesManagerSuccess,
      ),
      switchMap(() =>
        of([]).pipe(
          tap(() =>
            this.cache.clearUrl('http://localhost:8000/api/sales-managers'),
          ),
          map(() => salesManagersActions.invalidateCacheSuccess()),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private salesManagerService: SalesManagersService,
    private cache: CacheService,
  ) {}
}
