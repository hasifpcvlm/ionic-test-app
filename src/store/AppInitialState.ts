import { AppState } from './AppState';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AppInintialState: AppState = {
    loading: {
        show: false,
    },
    login: {
        error: null,
        isLoggedIn: false,
        isLoggingIn: false,
        isRecoweredPassword: false,
        isRecoweringPassword: false,
    }
};
