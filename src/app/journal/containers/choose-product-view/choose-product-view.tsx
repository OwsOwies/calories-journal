import { Button, List, ListItem } from 'native-base';
import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ActionDispatcher } from '../../../store';
import { AppState } from '../../../store';
import { ChooseProductForWeighting, ChooseRecipeForWeighting } from '../../actions';
import { AdBanner } from '../../components/ad-banner/ad-banner';
import { recipe } from '../../mock/mockedProducts';
import { Product, Recipe } from '../../models';
import { getProducts } from '../../selectors';

import styles from './style';

interface Props {
    chooseProductForWeighting: ActionDispatcher<ChooseProductForWeighting>;
    chooseRecipeForWeighting: ActionDispatcher<ChooseRecipeForWeighting>;
    products: Product[];
}

interface State {
    readonly displaySwitch: boolean;
}

class ChooseProductView extends Component<Props, State> {
    readonly state = {
        displaySwitch: false,
    };

    showProducts = (): void => {
        this.switchView(false);
    };

    showRecipes = (): void => {
        this.switchView(true);
    };

    switchView = (displaySwitch: boolean): void => {
        this.setState({ displaySwitch });
    };

    renderProducts(): Element {
        return <View>{this.props.products.map(this.renderProduct)}</View>;
    }

    renderRecipe(): Element {
        const chooseRecipeForWeighting = this.props.chooseRecipeForWeighting.bind(null, recipe);
        return (
            <View>
                <ListItem key={recipe.name}>
                    <TouchableOpacity style={styles.product} onPress={chooseRecipeForWeighting}>
                        <Text>{recipe.name}</Text>
                    </TouchableOpacity>
                </ListItem>
            </View>
        );
    }

    renderProduct = (product: Product): Element => {
        const chooseProductForWeighting = this.props.chooseProductForWeighting.bind(null, product);
        return (
            <ListItem key={product.name}>
                <TouchableOpacity style={styles.product} onPress={chooseProductForWeighting}>
                    <Text>{product.name}</Text>
                </TouchableOpacity>
            </ListItem>
        );
    };

    renderlist = (): Element =>
        this.state.displaySwitch ? (
            <List>{this.renderRecipe()}</List>
        ) : (
            <List>{this.renderProducts()}</List>
        );

    renderCommercialBanner = (): Element => {
        return (
            <View style={styles.commercialBanner}>
                <AdBanner />
            </View>
        );
    };

    render(): JSX.Element {
        return (
            <View>
                <View style={styles.buttons}>
                    <Button onPress={this.showProducts}>
                        <Text>Produkty</Text>
                    </Button>
                    <Button onPress={this.showRecipes}>
                        <Text>Szablony</Text>
                    </Button>
                </View>
                <View style={styles.content}>
                    {this.renderlist()}
                    {this.renderCommercialBanner()}
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    products: getProducts(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    chooseProductForWeighting: (product: Product) =>
        dispatch(new ChooseProductForWeighting(product)),
    chooseRecipeForWeighting: (rec: Recipe) => dispatch(new ChooseRecipeForWeighting(rec)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ChooseProductView);
