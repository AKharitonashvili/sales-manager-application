import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { ProductsActions } from '.';
import { Router } from '@angular/router';
import { productsMock } from '../../../app/mock/products.mock';

@Injectable()
export class ProductsEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      switchMap(() =>
        of(productsMock).pipe(
          tap((v) => console.log(v)),
          map((products) => ProductsActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductsActions.loadProductsFailure({ error })),
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
