/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable arrow-body-style */
import { createReducer, on } from '@ngrx/store';
import { AppInintialState } from '../AppInitialState';
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from './login.action';
import { loginState } from './loginState';

const initialState: loginState = AppInintialState.login;

const reducer = createReducer(initialState,
    // eslint-disable-next-line arrow-body-style
    on(recoverPassword, currentState => {
        return {
            ...currentState,
            error: null,
            isRecoweringPassword: true,
            isRecoweredPassword: false
        };
    }),
    on(recoverPasswordSuccess, currentState => {
        return {
            ...currentState,
            error: null,
            isRecoweringPassword: false,
            isRecoweredPassword: true
        };
    }),
    on(recoverPasswordFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isRecoweringPassword: false,
            isRecoweredPassword: false
        };
    }),
);

export function loginReducer(state: loginState, action) {
    return reducer(state, action);
}
