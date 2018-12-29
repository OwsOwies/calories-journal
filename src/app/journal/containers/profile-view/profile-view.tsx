import { Button, Form, Input, Item, Label } from 'native-base';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ActionDispatcher } from '../../../store';
import { AppState } from '../../../store';
import { ChangeLimits } from '../../actions';
import { UserLimits } from '../../models';
import { getUserLimits } from '../../selectors';

import styles from './style';

interface Props {
    limits: UserLimits;
    changeLimits: ActionDispatcher<ChangeLimits>;
}

interface State {
    readonly limits: UserLimits;
}

class ProfileView extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            limits: this.props.limits,
        };
    }

    onCaloriesChange = (calories: string) =>
        this.setState({
            limits: {
                ...this.state.limits,
                calories: parseInt(calories, 10),
            },
        });

    onProteinChange = (proteins: string) =>
        this.setState({
            limits: {
                ...this.state.limits,
                proteins: parseInt(proteins, 10),
            },
        });

    onCarbohydratesChange = (carbohydrates: string) =>
        this.setState({
            limits: {
                ...this.state.limits,
                carbohydrates: parseInt(carbohydrates, 10),
            },
        });

    onFatChange = (fat: string) =>
        this.setState({
            limits: {
                ...this.state.limits,
                fat: parseInt(fat, 10),
            },
        });

    save = () => {
        this.props.changeLimits(this.state.limits);
    };

    render(): JSX.Element {
        return (
            <View>
                <Text>Twoje limity</Text>
                <Form>
                    <Item inlineLabel>
                        <Label>Kalorie</Label>
                        <Input
                            placeholder={this.props.limits.calories.toString()}
                            keyboardType="numeric"
                            onChangeText={this.onCaloriesChange}
                        />
                    </Item>
                    <Item inlineLabel last>
                        <Label>Białko</Label>
                        <Input
                            placeholder={this.props.limits.proteins.toString()}
                            keyboardType="numeric"
                            onChangeText={this.onProteinChange}
                        />
                    </Item>
                    <Item inlineLabel last>
                        <Label>Węglowodany</Label>
                        <Input
                            placeholder={this.props.limits.carbohydrates.toString()}
                            keyboardType="numeric"
                            onChangeText={this.onCarbohydratesChange}
                        />
                    </Item>
                    <Item inlineLabel last>
                        <Label>Tłuszcze</Label>
                        <Input
                            placeholder={this.props.limits.fat.toString()}
                            keyboardType="numeric"
                            onChangeText={this.onFatChange}
                        />
                    </Item>
                </Form>
                <Button onPress={this.save}>
                    <Text>Zapisz i zamknij</Text>
                </Button>
            </View>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    limits: getUserLimits(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeLimits: (limits: UserLimits) => dispatch(new ChangeLimits(limits)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileView);
