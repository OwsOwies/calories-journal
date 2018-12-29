import { Map } from 'immutable';

import { formatDate } from '../shared/utils';

import { AuthAction, JournalActionTypes } from './actions';
import { mockedLimits } from './mock/mockedLimits';
import { mockedProducts, recipe } from './mock/mockedProducts';
import { Day, Meal, Product, Recipe, UserLimits } from './models';

export interface JournalState {
    dateJournal: Map<string, Day>; // date is key
    isWeightingProduct: boolean;
    products: Product[];
    choosenMealName: string;
    weightingProduct: Product;
    weightingRecipe: Recipe;
    limits: UserLimits;
}

const initialState: JournalState = {
    choosenMealName: '',
    dateJournal: Map(),
    isWeightingProduct: false,
    limits: mockedLimits,
    products: mockedProducts,
    weightingProduct: mockedProducts[0],
    weightingRecipe: recipe,
};

export function reducer(state: JournalState = initialState, action: AuthAction): JournalState {
    switch (action.type) {
        case JournalActionTypes.ADD_MEAL:
            return {
                ...state,
                dateJournal: state.dateJournal.setIn(
                    [formatDate(new Date()), action.payload],
                    new Meal(action.payload),
                ),
            };

        case JournalActionTypes.ADD_TO_MEAL:
            return {
                ...state,
                dateJournal: state.dateJournal.setIn(
                    [formatDate(new Date()), action.payload.mealName],
                    state.dateJournal
                        .get(formatDate(new Date()))!
                        .get(action.payload.mealName)!
                        .addEntity(action.payload),
                ),
            };

        case JournalActionTypes.SHOW_CHOOSE_PRODUCT_MODAL:
            return {
                ...state,
                choosenMealName: action.payload,
            };

        case JournalActionTypes.CHOOSE_PRODUCT_FOR_WEIGHTING:
            return {
                ...state,
                isWeightingProduct: true,
                weightingProduct: action.payload,
            };

        case JournalActionTypes.CHOOSE_RECIPE_FOR_WEIGHTING:
            return {
                ...state,
                isWeightingProduct: false,
                weightingRecipe: action.payload,
            };

        case JournalActionTypes.CHANGE_LIMITS:
            return {
                ...state,
                limits: action.payload,
            };

        default:
            return state;
    }
}
