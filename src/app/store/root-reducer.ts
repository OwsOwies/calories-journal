import { combineReducers } from 'redux';
import { Reducer } from 'redux';

import * as fromJournal from '../journal';

import { AppAction } from './app-action';

export interface AppState {
    journal: fromJournal.JournalState;
}

export const rootReducer: Reducer<AppState, AppAction> = combineReducers({
    journal: fromJournal.reducer,
});
