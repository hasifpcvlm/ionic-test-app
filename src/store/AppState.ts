import { LoadingState } from './loading/loadingState';
import { loginState } from './login/loginState';

export interface AppState {
    loading: LoadingState;
    login: loginState;
}
