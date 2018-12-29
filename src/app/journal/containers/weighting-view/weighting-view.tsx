import { Button, Card, CardItem, Icon, Input, Item, Text } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppState } from '../../../store';
import { ActionDispatcher } from '../../../store';
import { AddToMeal, FinishWeighting } from '../../actions';
import { Product, ProductEntity, Recipe } from '../../models';
import {
    getChoosenMealName,
    getWeightingProduct,
    getWeightingRecipe,
    isWeightingProduct,
} from '../../selectors';

import styles from './style';

interface Props {
    choosenMealName: string;
    isWeightingProduct: boolean;
    weightingProduct: Product;
    weightingRecipe: Recipe;
    addToMeal: ActionDispatcher<AddToMeal>;
    finishWeighting: ActionDispatcher<FinishWeighting>;
}

interface State {
    readonly count: number;
    readonly currentProduct: Product;
    readonly currentProductIndex: number;
}

class WeightingView extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            count: 0,
            currentProduct: this.props.isWeightingProduct
                ? this.props.weightingProduct
                : this.props.weightingRecipe.items[0],
            currentProductIndex: 0,
        };
    }

    addToMeal = () => {
        this.props.addToMeal({
            ...this.state.currentProduct,
            count: this.state.count,
            mealName: this.props.choosenMealName,
        });
    };

    onInputChange = (text: string): void => {
        this.setState({ count: parseInt(text, 10) });
    };

    getCurrentValue = (constValue: number) =>
        Math.round((constValue / 100) * this.state.count * 100) / 100;

    performAction = () => {
        this.addToMeal();
        const recipeItems = this.props.weightingRecipe.items;
        if (
            this.props.isWeightingProduct ||
            this.state.currentProductIndex === recipeItems.length - 1
        ) {
            this.props.finishWeighting();
        } else {
            const nextIndex = this.state.currentProductIndex + 1;
            this.setState({
                count: 0,
                currentProduct: recipeItems[nextIndex],
                currentProductIndex: nextIndex,
            });
        }
    };

    getButtonLabel = (): string => {
        const recipeItems = this.props.weightingRecipe.items;
        if (
            this.props.isWeightingProduct ||
            this.state.currentProductIndex === recipeItems.length - 1
        ) {
            return 'Dodaj i zamknij';
        } else {
            return 'Dodaj do posiłku';
        }
    };

    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.text}>{this.state.currentProduct.name}</Text>
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
                                {this.getCurrentValue(this.state.currentProduct.calories)} kcal
                            </Text>
                            <Text style={styles.cell}>
                                {this.getCurrentValue(this.state.currentProduct.proteins)} g
                            </Text>
                            <Text style={styles.cell}>
                                {this.getCurrentValue(this.state.currentProduct.carbohydrates)} g
                            </Text>
                            <Text style={{ ...styles.cell, marginBottom: 10 }}>
                                {this.getCurrentValue(this.state.currentProduct.fat)} g
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.cell}>
                                {this.state.currentProduct.calories} kcal
                            </Text>
                            <Text style={styles.cell}>{this.state.currentProduct.proteins} g</Text>
                            <Text style={styles.cell}>
                                {this.state.currentProduct.carbohydrates} g
                            </Text>
                            <Text style={styles.cell}>{this.state.currentProduct.fat} g</Text>
                        </View>
                    </View>
                </Card>
                <Button primary style={styles.button} onPress={this.performAction}>
                    <Text>{this.getButtonLabel()}</Text>
                </Button>
            </View>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    choosenMealName: getChoosenMealName(state),
    isWeightingProduct: isWeightingProduct(state),
    weightingProduct: getWeightingProduct(state),
    weightingRecipe: getWeightingRecipe(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addToMeal: (entity: ProductEntity) => dispatch(new AddToMeal(entity)),
    finishWeighting: () => dispatch(new FinishWeighting()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WeightingView);
