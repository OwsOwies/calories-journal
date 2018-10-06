import { Provider } from 'react-redux';

import * as fromAuth from './auth';
import * as fromJournal from './journal';
import { store as appStore, AppStore } from './store';

const registerViews = (store: AppStore, provider: typeof Provider) => {
    fromAuth.registerViews(store, provider);
    fromJournal.registerViews(store, provider);
};

export default registerViews.bind(null, appStore, Provider);
