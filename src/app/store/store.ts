import { applyMiddleware, compose, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

import { actionToPlainObject } from './action-purify.middleware';
import { AppAction } from './app-action';
import { rootEpic } from './root-epic';
import { rootReducer, AppState } from './root-reducer';

const epicMiddleware = createEpicMiddleware();

const loggerMiddleware = createLogger();

const enhancer = __DEV__
    ? compose(applyMiddleware(actionToPlainObject, epicMiddleware, loggerMiddleware))
    : compose(applyMiddleware(actionToPlainObject, epicMiddleware));

export type AppStore = Store<AppState, AppAction>;
export const store: AppStore = createStore(rootReducer, {}, enhancer);

epicMiddleware.run(rootEpic);
