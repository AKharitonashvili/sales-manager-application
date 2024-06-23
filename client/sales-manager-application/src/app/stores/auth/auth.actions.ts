import { createAction, props } from '@ngrx/store';
import { SalesManager } from 'src/app/models/sales-managers/sales-managers.models';

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>(),
);

export const loginSuccess = createAction('[Auth] Login Success');

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>(),
);

export const checkIfLoggedIn = createAction('[Auth] Check If Logged In');

export const checkIfLoggedInSuccess = createAction(
  '[Auth] Check If Logged In Success',
  props<{ isLoggedIn: boolean }>(),
);

export const checkIfLoggedInFailure = createAction(
  '[Auth] Check If Logged In Failure',
  props<{ error: string }>(),
);

export const addSalesManager = createAction(
  '[Auth] Add SalesManager',
  props<{ salesManager: SalesManager }>(),
);

export const addSalesManagerSuccess = createAction(
  '[Auth] Add SalesManager Success',
  props<{ salesManager: SalesManager }>(),
);

export const addSalesManagerFailure = createAction(
  '[Auth] Add SalesManager Failure',
  props<{ error: string }>(),
);
