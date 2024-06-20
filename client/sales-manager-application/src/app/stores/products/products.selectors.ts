import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducers';

export const PRODUCTS_FEATURE_KEY = 'Products';

const selectProductsFeature =
  createFeatureSelector<ProductsState>(PRODUCTS_FEATURE_KEY);

export const selectProducts = createSelector(
  selectProductsFeature,
  (state: ProductsState) => state.products,
);

export const selectProductsLoading = createSelector(
  selectProductsFeature,
  (state: ProductsState) => state.loading,
);

export const selectProductsError = createSelector(
  selectProductsFeature,
  (state: ProductsState) => state.error,
);
