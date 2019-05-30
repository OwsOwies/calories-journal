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

const showLimitsModal: Epic = action$ =>
    action$.pipe(
        ofType(JournalActionTypes.SHOW_LIMITS_MODAL),
        tap(() =>
            Navigation.showModal({
                component: {
                    id: JournalViews.PROFILE_VIEW,
                    name: JournalViews.PROFILE_VIEW,
                },
            }),
        ),
        ignoreElements(),
    );

const closeLimitsModal: Epic = action$ =>
    action$.pipe(
        ofType(JournalActionTypes.CHANGE_LIMITS),
        tap(() => Navigation.dismissAllModals()),
        ignoreElements(),
    );

const showNewProductModal: Epic = action$ =>
    action$.pipe(
        ofType(JournalActionTypes.SHOW_NEW_PRODUCT_MODAL),
        tap(() =>
            Navigation.showModal({
                component: {
                    id: JournalViews.NEW_PRODUCT_VIEW,
                    name: JournalViews.NEW_PRODUCT_VIEW,
                },
            }),
        ),
        ignoreElements(),
    );

const saveNewProduct: Epic = actions$ =>
    actions$.pipe(
        ofType(JournalActionTypes.SAVE_NEW_PRODUCT),
        tap(() => Navigation.dismissModal(JournalViews.NEW_PRODUCT_VIEW)),
        ignoreElements(),
    );

export const journalEpic = combineEpics(
    showAddMealOverlay,
    addMealToJournal,
    showChooseProductModal,
    choosenForWeighting,
    showWeightingModal,
    closeWeightingModal,
    showLimitsModal,
    closeLimitsModal,
    showNewProductModal,
    saveNewProduct,
);
