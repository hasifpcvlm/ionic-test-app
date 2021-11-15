import { createAction, props } from '@ngrx/store';

export const recoverPassword = createAction('[recover password]');
export const recoverPasswordSuccess = createAction('[recover password] success');
export const recoverPasswordFail = createAction('[recover password] fail', props<{ error: any }>());
