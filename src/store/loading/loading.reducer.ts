// eslint-disable-next-line @typescript-eslint/quotes
import { createReducer, on } from "@ngrx/store";
import { AppInintialState } from '../AppInitialState';
// eslint-disable-next-line @typescript-eslint/quotes
import { hide, show } from "./loading.action";
// eslint-disable-next-line @typescript-eslint/quotes
import { LoadingState } from "./loadingState";

const initialState: LoadingState = AppInintialState.loading;

const reducer = createReducer(initialState,
    // eslint-disable-next-line arrow-body-style
    on(show, () => {
        return { show: true };
    }),
    // eslint-disable-next-line arrow-body-style
    on(hide, () => {
        return { show: false };
    })
);

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function loadingReducer(state, action) {
    return reducer(state, action);
}
