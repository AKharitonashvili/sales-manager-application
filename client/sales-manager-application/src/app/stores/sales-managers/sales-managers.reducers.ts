import { createReducer, on } from '@ngrx/store';
import { SalesManager } from 'src/app/models/sales-managers/sales-managers.models';
import { salesManagersActions } from '.';
import { Product, SoldProduct } from 'src/app/models/products/products.model';

export interface SalesManagersState {
  loading: boolean;
  error?: string;
  salesManagers: SalesManager[];
  productsSoldByManager: {
    loading: boolean;
    error?: string;
    products?: SoldProduct[];
  };
}

export const initialState: SalesManagersState = {
  loading: false,
  salesManagers: [],
  productsSoldByManager: { loading: false },
};

export const salesManagerReducer = createReducer(
  initialState,
  on(
    salesManagersActions.loadSalesManagers,
    (state): SalesManagersState => ({ ...state, loading: true }),
  ),
  on(
    salesManagersActions.loadSalesManagersSuccess,
    (state, { salesManagers }): SalesManagersState => ({
      ...state,
      loading: false,
      salesManagers,
    }),
  ),
  on(
    salesManagersActions.loadSalesManagersFailure,
    (state, { error }): SalesManagersState => ({
      ...state,
      loading: false,
      error,
    }),
  ),
  // Delete SalesManager
  on(
    salesManagersActions.deleteSalesManager,
    (state): SalesManagersState => ({ ...state, loading: true }),
  ),
  on(
    salesManagersActions.deleteSalesManagerSuccess,
    (state, { id }): SalesManagersState => ({
      ...state,
      loading: false,
      salesManagers: state.salesManagers.filter((p) => p.id !== id),
    }),
  ),
  on(
    salesManagersActions.deleteSalesManagerFailure,
    (state, { error }): SalesManagersState => ({
      ...state,
      loading: false,
      error,
    }),
  ),
  // Add SalesManager
  on(
    salesManagersActions.addSalesManager,
    (state): SalesManagersState => ({ ...state, loading: true }),
  ),
  on(
    salesManagersActions.addSalesManagerSuccess,
    (state, { salesManager }): SalesManagersState => ({
      ...state,
      loading: false,
      salesManagers: [...state.salesManagers, salesManager],
    }),
  ),
  on(
    salesManagersActions.addSalesManagerFailure,
    (state, { error }): SalesManagersState => ({
      ...state,
      loading: false,
      error,
    }),
  ),

  // Edit SalesManager
  on(
    salesManagersActions.editSalesManager,
    (state): SalesManagersState => ({ ...state, loading: true }),
  ),
  on(
    salesManagersActions.editSalesManagerSuccess,
    (state, { salesManager }): SalesManagersState => {
      const salesManagerMap = new Map<string, SalesManager>();
      state.salesManagers.forEach((salesManager) =>
        salesManagerMap.set(salesManager.id ?? '', salesManager),
      );
      console.log({ salesManagerMap, id: salesManager });
      if (salesManagerMap.has(salesManager.id ?? '')) {
        salesManagerMap.set(salesManager.id ?? '', salesManager);
      }
      console.log(Array.from(salesManagerMap.values()));
      return {
        ...state,
        loading: false,
        salesManagers: Array.from(salesManagerMap.values()),
      };
    },
  ),
  on(
    salesManagersActions.editSalesManagerFailure,
    (state, { error }): SalesManagersState => ({
      ...state,
      loading: false,
      error,
    }),
  ),

  // Sold by managers products
  on(
    salesManagersActions.loadSoldProductsByManager,
    (state): SalesManagersState => ({
      ...state,
      productsSoldByManager: { ...state.productsSoldByManager, loading: true },
    }),
  ),
  on(
    salesManagersActions.loadSoldProductsByManagerSuccess,
    (state, { products }): SalesManagersState => ({
      ...state,
      productsSoldByManager: {
        loading: false,
        products,
      },
    }),
  ),
  on(
    salesManagersActions.loadSoldProductsByManagerFailure,
    (state, { error }): SalesManagersState => ({
      ...state,
      productsSoldByManager: {
        loading: false,
        error,
      },
    }),
  ),
);
