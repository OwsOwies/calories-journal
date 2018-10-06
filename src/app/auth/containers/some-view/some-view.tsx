import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import { AppState } from '../../../store';
import { getLoginError } from '../../selectors';

interface Props {
    loginError: null | string;
}

class SomeView extends Component<Props> {
    render(): JSX.Element {
        return (
            <View>
                <Text>Login error action was dispatched as response to Login Action</Text>
                <Text>If you see this overlay it means redux and navigation are working</Text>
                <Text>Error: {this.props.loginError}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    loginError: getLoginError(state),
});

export default connect(mapStateToProps)(SomeView);
