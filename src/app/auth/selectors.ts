import { prop } from 'ramda';
import { createSelector } from 'reselect';

import { AppState } from '../store';

import { AuthState } from './reducer';

export const getAuthState = (state: AppState): AuthState => state.auth;

export const getLoginError = createSelector(getAuthState, prop('error'));
