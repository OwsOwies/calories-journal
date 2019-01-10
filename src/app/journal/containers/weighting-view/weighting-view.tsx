import { Button, Card, CardItem, Icon, Input, Item, Text } from 'native-base';
import React, { Component } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
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
    // tslint:disable no-any
    _interval: any;
    _inputRef: Input | null = null;

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

    componentWillUnmount(): void {
        clearInterval(this._interval);
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

    simulateInput = () => {
        this._interval = setInterval(this.incrementCount, 3000);
    };

    incrementCount = () => {
        this.setState({ count: this.state.count + 10 });
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
                    <TouchableWithoutFeedback onPress={this.simulateInput} style={styles.text}>
                        <Text style={styles.text}>{this.props.choosenMealName}</Text>
                    </TouchableWithoutFeedback>
                </View>
                <Item regular>
                    <Input
                        placeholder="0"
                        keyboardType="numeric"
                        onChangeText={this.onInputChange}
                        value={this.state.count.toString()}
                    />
                </Item>
                <Card>
                    <CardItem header style={styles.row}>
                        <Text style={styles.cellL}/>
                        <Text style={styles.cell}>Aktualne</Text>
                        <Text style={styles.cell}>na 100g</Text>
                    </CardItem>
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.cellL}>Kalorie</Text>
                            <Text style={styles.cellL}>Białko</Text>
                            <Text style={styles.cellL}>Węglowodany</Text>
                            <Text style={styles.cellL}>Tłuszcze</Text>
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
