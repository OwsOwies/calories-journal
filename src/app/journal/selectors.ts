import { prop } from 'ramda';
import { createSelector } from 'reselect';

import { AppState } from '../store';

import { JournalState } from './reducer';

export const getJournalState = (state: AppState): JournalState => state.journal;

export const getDateJournal = createSelector(getJournalState, prop('dateJournal'));

export const getProducts = createSelector(getJournalState, prop('products'));

export const getChoosenMealName = createSelector(getJournalState, prop('choosenMealName'));

export const isWeightingProduct = createSelector(getJournalState, prop('isWeightingProduct'));

export const getWeightingProduct = createSelector(getJournalState, prop('weightingProduct'));

export const getWeightingRecipe = createSelector(getJournalState, prop('weightingRecipe'));

export const getUserLimits = createSelector(getJournalState, prop('limits'));
