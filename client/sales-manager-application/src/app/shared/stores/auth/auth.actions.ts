import { createAction, props } from '@ngrx/store';
import { SalesManager } from '../../models/sales-managers/sales-managers.models';

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>(),
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ managerId: string }>(),
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
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

export const reset = createAction('[Auth] Reset');

export const userInfo = createAction('[Auth] User info');

export const userInfoSuccess = createAction(
  '[Auth] User Info success',
  props<{ managerId: string }>(),
);

export const userInfoFailure = createAction(
  '[Auth] User Info Failure',
  props<{ error: string }>(),
);
