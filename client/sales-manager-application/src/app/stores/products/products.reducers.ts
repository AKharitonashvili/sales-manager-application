import { createReducer, on } from '@ngrx/store';
import { ProductsActions } from '.';
import { Products } from '../../models/products/products.model';

export interface ProductsState {
  loading: boolean;
  error?: string;
  products: Products[];
}

export const initialState: ProductsState = {
  loading: false,
  products: [],
};

export const productReducer = createReducer(
  initialState,
  on(
    ProductsActions.loadProducts,
    (state): ProductsState => ({ ...state, loading: true }),
  ),
  on(
    ProductsActions.loadProductsSuccess,
    (state, { products }): ProductsState => ({
      ...state,
      loading: false,
      products,
    }),
  ),
  on(
    ProductsActions.loadProductsFailure,
    (state, { error }): ProductsState => ({ ...state, loading: false, error }),
  ),
);
