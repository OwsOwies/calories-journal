import { Action } from '../store';

export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login success',
    LOGIN_ERROR = '[Auth] Login error',
}

export class Login implements Action<string> {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: string) {
        this.payload = payload;
    }
}

export class LoginSuccess implements Action<string> {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: string) {
        this.payload = payload;
    }
}

export class LoginError implements Action<string> {
    readonly type = AuthActionTypes.LOGIN_ERROR;
    constructor(public payload: string) {
        this.payload = payload;
    }
}

export type AuthAction = Login | LoginSuccess | LoginError;
