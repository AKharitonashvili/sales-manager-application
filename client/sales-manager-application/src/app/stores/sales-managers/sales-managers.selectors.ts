import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SalesManagersState } from './sales-managers.reducers';
import { SalesManager } from 'src/app/models/sales-managers/sales-managers.models';

export const SALES_MANAGERS_FEATURE_KEY = 'SalesManagers';

const selectSalesManagersFeature = createFeatureSelector<SalesManagersState>(
  SALES_MANAGERS_FEATURE_KEY,
);

export const selectSalesManagers = createSelector(
  selectSalesManagersFeature,
  (state: SalesManagersState) => state.salesManagers,
);

export const selectSalesManagersLoading = createSelector(
  selectSalesManagersFeature,
  (state: SalesManagersState) => state.loading,
);

export const selectSalesManagersError = createSelector(
  selectSalesManagersFeature,
  (state: SalesManagersState) => state.error,
);

export const selectSalesManagerById = (id: string) =>
  createSelector(selectSalesManagers, (salesManagers: SalesManager[]) =>
    salesManagers.find((m) => m.id === id),
  );

const selectSalesManagerProductsState = createSelector(
  selectSalesManagersFeature,
  (state: SalesManagersState) => state.productsSoldByManager,
);

export const selectSalesManagerProducts = createSelector(
  selectSalesManagerProductsState,
  (state) => state.products,
);

export const selectSalesManagerProductsLoading = createSelector(
  selectSalesManagerProductsState,
  (state) => state.loading,
);

export const selectSalesManagerProductsError = createSelector(
  selectSalesManagersFeature,
  (state) => state.error,
);
