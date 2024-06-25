import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '.';

export interface AuthState {
  loading: boolean;
  error?: string | null;
  managerId?: string | null;
  registrationSuccess?: boolean | null;
}

export const initialState: AuthState = {
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(
    AuthActions.login,
    (state): AuthState => ({
      ...state,
      loading: true,
      managerId: null,
      error: undefined,
    }),
  ),
  on(
    AuthActions.loginSuccess,
    (state, { managerId }): AuthState => ({
      ...state,
      loading: false,
      managerId,
      error: undefined,
    }),
  ),
  on(
    AuthActions.loginFailure,
    (state, { error }): AuthState => ({
      ...state,
      loading: false,
      error,
      managerId: null,
    }),
  ),

  // Add SalesManager
  on(
    AuthActions.addSalesManager,
    (state): AuthState => ({
      ...state,
      loading: true,
      registrationSuccess: null,
      error: undefined,
    }),
  ),
  on(
    AuthActions.addSalesManagerSuccess,
    (state): AuthState => ({
      ...state,
      loading: false,
      registrationSuccess: true,
      error: undefined,
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

  // Reset
  on(AuthActions.reset, (): AuthState => initialState),

  // User Info
  on(
    AuthActions.userInfoSuccess,
    (state, { managerId }): AuthState => ({
      ...state,
      managerId,
    }),
  ),
  on(
    AuthActions.addSalesManagerFailure,
    (state, { error }): AuthState => ({
      ...state,
      error,
    }),
  ),
);
