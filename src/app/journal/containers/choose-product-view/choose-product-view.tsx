import { List, ListItem } from 'native-base';
import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ActionDispatcher } from '../../../store';
import { AppState } from '../../../store';
import { ChooseProductForWeighting } from '../../actions';
import { Product } from '../../models';
import { getProducts } from '../../selectors';

import styles from './style';

interface Props {
    chooseProductForWeighting: ActionDispatcher<ChooseProductForWeighting>;
    products: Product[];
}

class ChooseProductView extends Component<Props> {
    renderProducts(): Element {
        return <View>{this.props.products.map(this.renderProduct)}</View>;
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

    renderCommercialBanner = (): Element => {
        return (
            <View style={styles.commercialBanner}>
                <Text>Tutaj miejsce na reklamę</Text>
            </View>
        );
    };

    render(): JSX.Element {
        return (
            <View style={styles.content}>
                <List>{this.renderProducts()}</List>
                {this.renderCommercialBanner()}
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
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ChooseProductView);
