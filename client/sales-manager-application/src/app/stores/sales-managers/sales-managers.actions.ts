import { createAction, props } from '@ngrx/store';
import { SalesManager } from 'src/app/models/sales-managers/sales-managers.models';

export const loadSalesManagers = createAction(
  '[SalesManagers] Load SalesManagers',
);

export const loadSalesManagersSuccess = createAction(
  '[SalesManagers] Load SalesManagers Success',
  props<{ salesManagers: SalesManager[] }>(),
);

export const loadSalesManagersFailure = createAction(
  '[SalesManagers] Load SalesManagers Failure',
  props<{ error: string }>(),
);

export const addSalesManager = createAction(
  '[SalesManagers] Add SalesManager',
  props<{ salesManager: SalesManager }>(),
);

export const addSalesManagerSuccess = createAction(
  '[SalesManagers] Add SalesManager Success',
  props<{ salesManager: SalesManager }>(),
);

export const addSalesManagerFailure = createAction(
  '[SalesManagers] Add SalesManager Failure',
  props<{ error: string }>(),
);

export const editSalesManager = createAction(
  '[SalesManagers] Edit SalesManager',
  props<{ salesManager: SalesManager }>(),
);

export const editSalesManagerSuccess = createAction(
  '[SalesManagers] Edit SalesManager Success',
  props<{ salesManager: SalesManager }>(),
);

export const editSalesManagerFailure = createAction(
  '[SalesManagers] Edit SalesManager Failure',
  props<{ error: string }>(),
);

export const deleteSalesManager = createAction(
  '[SalesManagers] Delete SalesManager',
  props<{ id: string }>(),
);

export const deleteSalesManagerSuccess = createAction(
  '[SalesManagers] Delete SalesManager Success',
  props<{ id: string }>(),
);

export const deleteSalesManagerFailure = createAction(
  '[SalesManagers] Delete SalesManager Failure',
  props<{ error: string }>(),
);
