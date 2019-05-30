import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import { AppStore } from '../store';

import ChooseProductView from './containers/choose-product-view/choose-product-view';
import JournalView from './containers/journal-view/journal-view';
import NewMealView from './containers/new-meal-view/new-meal-view';
import NewProductView from './containers/new-product-view/new-product-view';
import ProfileView from './containers/profile-view/profile-view';
import WeightingView from './containers/weighting-view/weighting-view';

export enum Views {
    JOURNAL_VIEW = '[Journal] journal view',
    NEW_MEAL_VIEW = '[Journal] new meal view',
    CHOOSE_PRODUCT_VIEW = '[Journal] choose product view',
    WEIGHTING_VIEW = '[Journal] weighting view',
    PROFILE_VIEW = '[Journal] profile view',
    NEW_PRODUCT_VIEW = '[Journal] new product view',
}

export const registerViews = (store: AppStore, provider: typeof Provider) => {
    Navigation.registerComponentWithRedux(Views.JOURNAL_VIEW, () => JournalView, provider, store);
    Navigation.registerComponentWithRedux(Views.NEW_MEAL_VIEW, () => NewMealView, provider, store);
    Navigation.registerComponentWithRedux(
        Views.CHOOSE_PRODUCT_VIEW,
        () => ChooseProductView,
        provider,
        store,
    );
    Navigation.registerComponentWithRedux(
        Views.WEIGHTING_VIEW,
        () => WeightingView,
        provider,
        store,
    );
    Navigation.registerComponentWithRedux(Views.PROFILE_VIEW, () => ProfileView, provider, store);
    Navigation.registerComponentWithRedux(
        Views.NEW_PRODUCT_VIEW,
        () => NewProductView,
        provider,
        store,
    );
};
