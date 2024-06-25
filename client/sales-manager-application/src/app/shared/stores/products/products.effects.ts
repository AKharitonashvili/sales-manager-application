import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { ProductsActions } from '.';
import { ProductsService } from '../../services/products/products.service';

@Injectable()
export class ProductsEffects {
  getProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      switchMap(() =>
        this.productsService.getProducts().pipe(
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
        this.productsService.addProduct(product).pipe(
          tap(console.log),
          map((product) => ProductsActions.addProductSuccess({ product })),
          catchError((error) =>
            of(ProductsActions.addProductFailure({ error })),
          ),
        ),
      ),
    );
  });

  editProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.editProduct),
      switchMap(({ product }) =>
        this.productsService.editProduct(product).pipe(
          map(() => ProductsActions.editProductSuccess({ product })),
          catchError((error) =>
            of(ProductsActions.editProductFailure({ error })),
          ),
        ),
      ),
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.deleteProduct),
      switchMap(({ id }) =>
        this.productsService.deleteProduct(id).pipe(
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
    private productsService: ProductsService,
  ) {}
}
