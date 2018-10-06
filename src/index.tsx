import React from 'react';
import { Provider } from 'react-redux';

import App from './app/App';
import { store } from './app/store/store';

const KaloriePITApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default KaloriePITApp;
