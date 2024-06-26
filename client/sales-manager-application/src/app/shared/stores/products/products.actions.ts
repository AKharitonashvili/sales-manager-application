import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/products/products.model';

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

export const addProductSuccess = createAction(
  '[Products] Add Product Success',
  props<{ product: Product }>(),
);

export const addProductFailure = createAction(
  '[Products] Add Product Failure',
  props<{ error: string }>(),
);

export const editProduct = createAction(
  '[Products] Edit Product',
  props<{ product: Product }>(),
);

export const editProductSuccess = createAction(
  '[Products] Edit Product Success',
  props<{ product: Product }>(),
);

export const editProductFailure = createAction(
  '[Products] Edit Product Failure',
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

export const sellProduct = createAction(
  '[Products] Sell Product',
  props<{ id: string; quantity: number; managerId: string }>(),
);

export const sellProductSuccess = createAction(
  '[Products] Sell Product Success',
  props<{ id: string; quantity: number }>(),
);

export const sellProductFailure = createAction(
  '[Products] Sell Product Failure',
  props<{ error: string }>(),
);

export const invalidateCache = createAction('[Products] Invalidate Cache');

export const invalidateCacheSuccess = createAction(
  '[Products] Invalidate Cache Success',
);
