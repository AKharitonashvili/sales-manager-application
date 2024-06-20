import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducers';

export const AUTH_FEATURE_KEY = 'FEATURE_AUTH';

const selectAuthFeature = createFeatureSelector<AuthState>('FEATURE_AUTH');

export const selectAuth = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.isLoggedIn,
);

export const selectAuthLoading = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.loading,
);

export const selectAuthError = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.error,
);
