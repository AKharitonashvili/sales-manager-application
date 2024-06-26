import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducers';

export const AUTH_FEATURE_KEY = 'Auth';

const selectAuthFeature = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectAuthLoading = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.loading,
);

export const selectAuthError = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.error,
);

export const selectRegistrationSuccess = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.registrationSuccess,
);

export const selectManagerId = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.managerId,
);
