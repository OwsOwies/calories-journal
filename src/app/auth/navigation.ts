import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import { AppStore } from '../store';

import SomeView from './containers/some-view/some-view';

export enum Views {
    SOME_VIEW = '[Auth] some view',
}

export const registerViews = (store: AppStore, provider: typeof Provider) => {
    Navigation.registerComponentWithRedux(Views.SOME_VIEW, () => SomeView, provider, store);
};
