import { AuthAction, AuthActionTypes } from './actions';

export interface AuthState {
    error: string | null;
}

const initialState: AuthState = {
    error: null,
};

export function reducer(state: AuthState = initialState, action: AuthAction): AuthState {
    switch (action.type) {
        case AuthActionTypes.LOGIN:
            return { ...state, error: null };

        case AuthActionTypes.LOGIN_SUCCESS:
            return { ...state, error: null };

        case AuthActionTypes.LOGIN_ERROR:
            return { ...state, error: action.payload };

        default:
            return state;
    }
}
