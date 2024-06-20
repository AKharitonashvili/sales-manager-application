import { createAction, props } from '@ngrx/store';
import { Product } from '../../../app/models/products/products.model';

export const loadProducts = createAction('[Products] Load Products');

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[] }>(),
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: string }>(),
);

export const addProduct = createAction(
  '[Products] Add Product',
  props<{ product: Product }>(),
);

export const addProductSuccess = createAction('[Products] Add Product Success');

export const addProductFailure = createAction(
  '[Products] Add Product Failure',
  props<{ error: string }>(),
);

export const deleteProduct = createAction(
  '[Products] Delete Product',
  props<{ id: string }>(),
);

export const deleteProductSuccess = createAction(
  '[Products] Delete Product Success',
  props<{ id: string }>(),
);

export const deleteProductFailure = createAction(
  '[Products] Delete Product Failure',
  props<{ error: string }>(),
);
