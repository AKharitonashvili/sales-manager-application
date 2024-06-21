import { createReducer, on } from '@ngrx/store';
import { ProductsActions } from '.';
import { Product } from '../../models/products/products.model';

export interface ProductsState {
  loading: boolean;
  error?: string;
  products: Product[];
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
  // Delete Product
  on(
    ProductsActions.deleteProduct,
    (state): ProductsState => ({ ...state, loading: true }),
  ),
  on(
    ProductsActions.deleteProductSuccess,
    (state, { id }): ProductsState => ({
      ...state,
      loading: false,
      products: state.products.filter((p) => p.id !== id),
    }),
  ),
  on(
    ProductsActions.deleteProductFailure,
    (state, { error }): ProductsState => ({ ...state, loading: false, error }),
  ),
  // Add Product
  on(
    ProductsActions.addProduct,
    (state): ProductsState => ({ ...state, loading: true }),
  ),
  on(
    ProductsActions.addProductSuccess,
    (state, { product }): ProductsState => ({
      ...state,
      loading: false,
      products: [...state.products, product],
    }),
  ),
  on(
    ProductsActions.addProductFailure,
    (state, { error }): ProductsState => ({ ...state, loading: false, error }),
  ),

  // Edit Product
  on(
    ProductsActions.addProduct,
    (state): ProductsState => ({ ...state, loading: true }),
  ),
  on(
    ProductsActions.addProductSuccess,
    (state, { product }): ProductsState => ({
      ...state,
      loading: false,
      products: [...state.products, product],
    }),
  ),
  on(
    ProductsActions.addProductFailure,
    (state, { error }): ProductsState => ({ ...state, loading: false, error }),
  ),
);