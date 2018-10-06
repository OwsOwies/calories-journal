import React, { Component } from 'react';
import { View } from 'react-native';

import styles from './style';

export class Backdrop extends Component {
    render(): JSX.Element {
        return <View style={styles.backdrop}>{this.props.children}</View>;
    }
}
