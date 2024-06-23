import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '.';

export interface AuthState {
  loading: boolean;
  error?: string;
  isLoggedIn: boolean;
  registrationSuccess?: boolean | null;
}

export const initialState: AuthState = {
  loading: false,
  isLoggedIn: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state): AuthState => ({ ...state, loading: true })),
  on(
    AuthActions.loginSuccess,
    (state): AuthState => ({
      ...state,
      loading: false,
      isLoggedIn: true,
    }),
  ),
  on(
    AuthActions.loginFailure,
    (state, { error }): AuthState => ({ ...state, loading: false, error }),
  ),
  on(
    AuthActions.checkIfLoggedIn,
    (state): AuthState => ({ ...state, loading: true }),
  ),
  on(
    AuthActions.checkIfLoggedInSuccess,
    (state, { isLoggedIn }): AuthState => ({
      ...state,
      loading: false,
      isLoggedIn,
    }),
  ),
  on(
    AuthActions.checkIfLoggedInFailure,
    (state, { error }): AuthState => ({ ...state, loading: false, error }),
  ),
  // Add SalesManager
  on(
    AuthActions.addSalesManager,
    (state): AuthState => ({
      ...state,
      loading: true,
      registrationSuccess: null,
    }),
  ),
  on(
    AuthActions.addSalesManagerSuccess,
    (state): AuthState => ({
      ...state,
      loading: false,
      registrationSuccess: true,
    }),
  ),
  on(
    AuthActions.addSalesManagerFailure,
    (state, { error }): AuthState => ({
      ...state,
      loading: false,
      registrationSuccess: false,
      error,
    }),
  ),
);
