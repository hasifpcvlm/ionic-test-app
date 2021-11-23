import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const recoverPassword = createAction('[recover password]');
export const recoverPasswordSuccess = createAction('[recover password] success');
export const recoverPasswordFail = createAction('[recover password] fail', props<{ error: any }>());

export const loggingIn = createAction('login');
export const loginSuccess = createAction('[login] success', props<{ user: User }>());
export const loginFail = createAction('[login] fail', props<{ error: any }>());
