import { Button, Card, CardItem, Icon, Input, Item, Text } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppState } from '../../../store';
import { ActionDispatcher } from '../../../store';
import { AddToMeal } from '../../actions';
import { Product, ProductEntity } from '../../models';
import { getChoosenMealName, getWeightingProduct } from '../../selectors';

import styles from './style';

interface Props {
    choosenMealName: string;
    weightingProduct: Product;
    addToMeal: ActionDispatcher<AddToMeal>;
}

interface State {
    readonly count: number;
}

class WeightingView extends Component<Props, State> {
    readonly state = {
        count: 0,
    };

    addToMeal = () => {
        this.props.addToMeal({
            ...this.props.weightingProduct,
            count: this.state.count,
            mealName: this.props.choosenMealName,
        });
    };

    onInputChange = (text: string): void => {
        this.setState({ count: parseInt(text, 10) });
    };

    getCurrentValue = (constValue: number) =>
        Math.round((constValue / 100) * this.state.count * 100) / 100;

    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.text}>{this.props.weightingProduct.name}</Text>
                    <Text style={styles.text}>{this.props.choosenMealName}</Text>
                </View>
                <Item regular>
                    <Input
                        placeholder="0"
                        keyboardType="numeric"
                        onChangeText={this.onInputChange}
                    />
                </Item>
                <Card>
                    <CardItem header style={styles.row}>
                        <Text />
                        <Text>Aktualne</Text>
                        <Text>na 100g</Text>
                    </CardItem>
                    <View style={styles.row}>
                        <View>
                            <Icon style={styles.cell} name="flash" />
                            <Icon style={styles.cell} name="paw" />
                            <Icon style={styles.cell} name="nutrition" />
                            <Icon style={styles.cell} name="color-filter" />
                        </View>
                        <View>
                            <Text style={styles.cell}>
                                {this.getCurrentValue(this.props.weightingProduct.calories)} kcal
                            </Text>
                            <Text style={styles.cell}>
                                {this.getCurrentValue(this.props.weightingProduct.proteins)} g
                            </Text>
                            <Text style={styles.cell}>
                                {this.getCurrentValue(this.props.weightingProduct.carbohydrates)} g
                            </Text>
                            <Text style={{ ...styles.cell, marginBottom: 10 }}>
                                {this.getCurrentValue(this.props.weightingProduct.fat)} g
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.cell}>
                                {this.props.weightingProduct.calories} kcal
                            </Text>
                            <Text style={styles.cell}>
                                {this.props.weightingProduct.proteins} g
                            </Text>
                            <Text style={styles.cell}>
                                {this.props.weightingProduct.carbohydrates} g
                            </Text>
                            <Text style={styles.cell}>{this.props.weightingProduct.fat} g</Text>
                        </View>
                    </View>
                </Card>
                <Button primary style={styles.button} onPress={this.addToMeal}>
                    <Text>Dodaj do posiłku</Text>
                </Button>
            </View>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    choosenMealName: getChoosenMealName(state),
    weightingProduct: getWeightingProduct(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addToMeal: (entity: ProductEntity) => dispatch(new AddToMeal(entity)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WeightingView);
