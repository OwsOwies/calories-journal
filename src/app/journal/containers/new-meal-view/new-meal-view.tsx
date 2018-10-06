import { Button, Input, Item, Text } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ActionDispatcher } from '../../../store';
import { Backdrop } from '../../../ui/modal-with-backdrop/modal-with-backdrop';
import { AddMeal } from '../../actions';

import styles from './style';

interface Props {
    addMeal: ActionDispatcher<AddMeal>;
}

interface State {
    readonly text: string;
}

class NewMealView extends Component<Props, State> {
    readonly state = {
        text: '',
    };

    onInputChange = (text: string): void => {
        this.setState({ text });
    };

    onButtonPress = (): void => {
        this.props.addMeal(this.state.text);
    };

    render(): JSX.Element {
        return (
            <Backdrop>
                <View style={styles.content}>
                    <Text style={styles.title}>Podaj nazwę nowego posiłku</Text>
                    <Item regular>
                        <Input onChangeText={this.onInputChange} />
                    </Item>
                    <Button primary onPress={this.onButtonPress} style={styles.button}>
                        <Text>Zatwierdź</Text>
                    </Button>
                </View>
            </Backdrop>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addMeal: (name: string) => dispatch(new AddMeal(name)),
});

export default connect(
    null,
    mapDispatchToProps,
)(NewMealView);
