import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import JournalView from './journal/containers/journal-view/journal-view';

EStyleSheet.build({});

export default class App extends Component {
    render(): JSX.Element {
        return <JournalView />;
    }
}
