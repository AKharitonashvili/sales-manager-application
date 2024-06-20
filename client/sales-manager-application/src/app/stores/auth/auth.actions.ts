import { createAction, props } from '@ngrx/store';

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
