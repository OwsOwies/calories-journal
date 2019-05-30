import { Button, Card, CardItem, Input, Item, Text } from 'native-base';
import React, { Component } from 'react';
import { NativeEventEmitter, NativeModules, TouchableWithoutFeedback, View } from 'react-native';
import BleManager from 'react-native-ble-manager';
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

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

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
    connected = false;

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

    componentWillMount(): void {
        bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', args => {
            // The id: args.id
            // The name: args.name
            if (!this.connected && args.name === 'Electronic Scale') {
                //this.connected = true;
                console.log('device', args.advertising);
                /**
                BleManager.connect(args.id)
                    .then(() => {
                        console.log('connected');
                        return BleManager.retrieveServices(args.id, args.advertising.serviceUUIDs);
                    })
                    .then(peripheralInfo => {
                        console.log('peripheral info', peripheralInfo);
                        console.log('try bonding');
                        return BleManager.createBond(args.id);
                        /*return BleManager.startNotification(
                            args.id,
                            args.advertising.serviceUUIDs[0],
                            peripheralInfo.characteristics[17].characteristic,
                        );
                        /*
                        return this.subscribeToCharacteristics(
                            args.id,
                            args.advertising.serviceUUIDs[0],
                            peripheralInfo.characteristics,
                        );
                    })
                    .then(() => {
                        console.log('bonded');
                        bleManagerEmitter.addListener(
                            'BleManagerDidUpdateValueForCharacteristic',
                            a => {
                                console.log('characterisric change', a.characteristic, a);
                            },
                        );
                    })
                    .catch(err => {
                        console.log(err);
                    }); */
            }
        });

        console.log('will mount');
        BleManager.start({ showAlert: false })
            .then(() => {
                // Success code
                console.log('Module initialized');
                return BleManager.scan([], 10000, true);
            })
            .then(() => {
                console.log('scan started');
            })
            .catch(e => {
                console.log(e);
            });
    }

    /*
    subscribeToCharacteristics(peripheralId: string, serviceUUID: string, list: any[]): void {
        list.forEach(characteristic => {
            console.log(characteristic.characteristic);
            BleManager.startNotification(peripheralId, serviceUUID, characteristic.characteristic)
                .then(() => {
                    console.log('characteristic succ', characteristic.characteristic);
                })
                .catch(err => {
                    console.log('characteristic err', err);
                });
        });
    }*/

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
                        <Text style={styles.cellL} />
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
