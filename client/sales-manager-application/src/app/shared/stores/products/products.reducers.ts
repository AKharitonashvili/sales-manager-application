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
    ProductsActions.editProductSuccess,
    (state, { product }): ProductsState => {
      const productMap = new Map<string, Product>();
      state.products.forEach((product) =>
        productMap.set(product.id ?? '', product),
      );
      if (productMap.has(product.id ?? '')) {
        productMap.set(product.id ?? '', product);
      }
      return {
        ...state,
        loading: false,
        products: Array.from(productMap.values()),
      };
    },
  ),
  on(
    ProductsActions.editProductFailure,
    (state, { error }): ProductsState => ({ ...state, loading: false, error }),
  ),

  //

  on(
    ProductsActions.sellProductSuccess,
    (state, { id, quantity }): ProductsState => {
      const productMap = new Map<string, Product>();
      state.products.forEach((product) =>
        productMap.set(product.id ?? '', product),
      );

      if (productMap.has(id ?? '')) {
        const product = productMap.get(id ?? '') as Product;
        if (product.quantity && quantity && id) {
          productMap.set(id, {
            ...product,
            quantity: product.quantity - quantity,
          });
        }
      }
      return {
        ...state,
        loading: false,
        products: Array.from(productMap.values()),
      };
    },
  ),
  on(
    ProductsActions.sellProductFailure,
    (state, { error }): ProductsState => ({ ...state, loading: false, error }),
  ),
);
