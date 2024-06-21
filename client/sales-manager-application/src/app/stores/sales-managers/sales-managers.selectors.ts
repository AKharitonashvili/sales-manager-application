import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SalesManagersState } from './sales-managers.reducers';

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
