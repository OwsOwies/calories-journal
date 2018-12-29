import { Navigation } from 'react-native-navigation';
import { combineEpics, ofType, Epic } from 'redux-observable';
import { ignoreElements, mapTo, tap } from 'rxjs/operators';

import { JournalActionTypes, ShowWeightingModal } from './actions';
import { Views as JournalViews } from './navigation';

const showAddMealOverlay: Epic = action$ =>
    action$.pipe(
        ofType(JournalActionTypes.SHOW_ADD_MEAL_OVERLAY),
        tap(() =>
            Navigation.showOverlay({
                component: { id: JournalViews.NEW_MEAL_VIEW, name: JournalViews.NEW_MEAL_VIEW },
            }),
        ),
        ignoreElements(),
    );

const addMealToJournal: Epic = action$ =>
    action$.pipe(
        ofType(JournalActionTypes.ADD_MEAL),
        tap(() => Navigation.dismissOverlay(JournalViews.NEW_MEAL_VIEW)),
        ignoreElements(),
    );

const showChooseProductModal: Epic = action$ =>
    action$.pipe(
        ofType(JournalActionTypes.SHOW_CHOOSE_PRODUCT_MODAL),
        tap(() =>
            Navigation.showModal({
                component: {
                    id: JournalViews.CHOOSE_PRODUCT_VIEW,
                    name: JournalViews.CHOOSE_PRODUCT_VIEW,
                },
            }),
        ),
        ignoreElements(),
    );

const choosenForWeighting: Epic = action$ =>
    action$.pipe(
        ofType(
            JournalActionTypes.CHOOSE_PRODUCT_FOR_WEIGHTING,
            JournalActionTypes.CHOOSE_RECIPE_FOR_WEIGHTING,
        ),
        tap(() => Navigation.dismissAllModals()),
        mapTo(new ShowWeightingModal()),
    );

const showWeightingModal: Epic = action$ =>
    action$.pipe(
        ofType(JournalActionTypes.SHOW_WEIGHTING_MODAL),
        tap(() =>
            Navigation.showModal({
                component: {
                    id: JournalViews.WEIGHTING_VIEW,
                    name: JournalViews.WEIGHTING_VIEW,
                },
            }),
        ),
        ignoreElements(),
    );

const closeWeightingModal: Epic = action$ =>
    action$.pipe(
        ofType(JournalActionTypes.FINISH_WEIGHTING),
        tap(() => Navigation.dismissAllModals()),
        ignoreElements(),
    );

export const journalEpic = combineEpics(
    showAddMealOverlay,
    addMealToJournal,
    showChooseProductModal,
    choosenForWeighting,
    showWeightingModal,
    closeWeightingModal,
);
