import { Middleware } from 'redux';

import { AppAction } from './app-action';
import { AppState } from './root-reducer';

export const actionToPlainObject: Middleware<AppState, AppAction> = () => next => (
    action: AppAction,
) => {
    return next(Object.assign({}, action));
};
