import { StoreModule } from '@ngrx/store';
import { loadingReducer } from './loading/loading.reducer';
import { loginReducer } from './login/login.reducer';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AppStoreModule = [
    StoreModule.forRoot([]),
    StoreModule.forFeature('loading', loadingReducer),
    StoreModule.forFeature('login', loginReducer)
];
