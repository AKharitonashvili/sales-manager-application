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
  registrationSuccess?: boolean | null;
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
    (state): SalesManagersState => ({
      ...state,
      loading: true,
      registrationSuccess: null,
    }),
  ),
  on(
    salesManagersActions.addSalesManagerSuccess,
    (state): SalesManagersState => ({
      ...state,
      loading: false,
      registrationSuccess: true,
    }),
  ),
  on(
    salesManagersActions.addSalesManagerFailure,
    (state, { error }): SalesManagersState => ({
      ...state,
      loading: false,
      registrationSuccess: false,
      error,
    }),
  ),
);
