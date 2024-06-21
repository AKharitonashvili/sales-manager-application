import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { ProductsActions } from '.';
import { Router } from '@angular/router';
import { productsMock } from '../../../app/mock/products.mock';

@Injectable()
export class ProductsEffects {
  getProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      switchMap(() =>
        of(productsMock).pipe(
          map((products) => ProductsActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductsActions.loadProductsFailure({ error })),
          ),
        ),
      ),
    );
  });

  addProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.addProduct),
      switchMap(({ product }) =>
        of(null).pipe(
          map(() => ProductsActions.addProductSuccess({ product })),
          catchError((error) =>
            of(ProductsActions.addProductFailure({ error })),
          ),
        ),
      ),
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.deleteProduct),
      switchMap(({ id }) =>
        of(null).pipe(
          map(() => ProductsActions.deleteProductSuccess({ id })),
          catchError((error) =>
            of(ProductsActions.deleteProductFailure({ error })),
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
