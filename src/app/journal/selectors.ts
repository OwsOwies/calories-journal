import { prop } from 'ramda';
import { createSelector } from 'reselect';

import { AppState } from '../store';

import { JournalState } from './reducer';

export const getJournalState = (state: AppState): JournalState => state.journal;

export const getDateJournal = createSelector(getJournalState, prop('dateJournal'));

export const getProducts = createSelector(getJournalState, prop('products'));

export const getChoosenMealName = createSelector(getJournalState, prop('choosenMealName'));

export const getWeightingProduct = createSelector(getJournalState, prop('weightingProduct'));
