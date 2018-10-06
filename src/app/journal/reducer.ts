import { Map } from 'immutable';

import { formatDate } from '../shared/utils';

import { AuthAction, JournalActionTypes } from './actions';
import { mockedProducts } from './mock/mockedProducts';
import { Day, Meal, Product } from './models';

export interface JournalState {
    dateJournal: Map<string, Day>; // date is key
    products: Product[];
    choosenMealName: string;
    weightingProduct: Product;
}

const initialState: JournalState = {
    choosenMealName: '',
    dateJournal: Map(),
    products: mockedProducts,
    weightingProduct: mockedProducts[0],
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
                weightingProduct: action.payload,
            };

        default:
            return state;
    }
}
