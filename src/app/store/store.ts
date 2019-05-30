import { applyMiddleware, compose, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { persistReducer, persistStore } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { actionToPlainObject } from './action-purify.middleware';
import { AppAction } from './app-action';
import { rootEpic } from './root-epic';
import { rootReducer, AppState } from './root-reducer';

const epicMiddleware = createEpicMiddleware();

const loggerMiddleware = createLogger();

const enhancer = __DEV__
    ? compose(applyMiddleware(actionToPlainObject, epicMiddleware, loggerMiddleware))
    : compose(applyMiddleware(actionToPlainObject, epicMiddleware));

const persistConfig = {
    transforms: [immutableTransform()],
    key: 'root',
    storage,
};

export type AppStore = Store<AppState, AppAction>;
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store: AppStore = createStore(persistedReducer, {}, enhancer);
export const persistor = persistStore(store);

epicMiddleware.run(rootEpic);
