import { Map } from 'immutable';
import { DatePicker, Icon, Row } from 'native-base';
import { Button, Card, CardItem } from 'native-base';
import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { formatDate } from '../../../shared';
import { AppState } from '../../../store';
import { ActionDispatcher } from '../../../store';
import { ShowChooseProductModal, ShowLimitsModal, ShowNewMealOverlay } from '../../actions';
import { AdBanner } from '../../components/ad-banner/ad-banner';
import { LimitBars } from '../../components/limit-bars/limit-bars';
import { Day, Meal, ProductEntity, UserLimits } from '../../models';
import { getDateJournal, getUserLimits } from '../../selectors';

import styles from './style';

interface Props {
    dateJournal: Map<string, Day>;
    limits: UserLimits;
    showNewMealOverlay: ActionDispatcher<ShowNewMealOverlay>;
    showChooseProductModal: ActionDispatcher<ShowChooseProductModal>;
    showProfileView: ActionDispatcher<ShowLimitsModal>;
}

interface State {
    readonly chosenDate: string;
    readonly today: string;
}

class JournalView extends Component<Props, State> {
    readonly state = {
        chosenDate: formatDate(new Date()),
        today: formatDate(new Date()),
    };

    // tslint:disable jsx-no-multiline-js
    renderMeals(): Element | undefined {
        const chosenDayJournal = this.props.dateJournal.get(this.state.chosenDate);
        return (
            chosenDayJournal && (
                <ScrollView style={{ margin: 10 }}>
                    {chosenDayJournal.map(this.renderMeal).toList()}
                </ScrollView>
            )
        );
    }

    renderMeal = (v: Map<string, ProductEntity>, k: string): Element => {
        const showChooseProductModal = this.props.showChooseProductModal.bind(null, k);
        return (
            <Card key={k}>
                <View style={styles.meal}>
                    <Text>{k}</Text>
                    {this.state.today === this.state.chosenDate ? (
                        <Button rounded style={styles.btn} onPress={showChooseProductModal}>
                            <Text style={styles.btnTxt}>Dodaj produkt</Text>
                        </Button>
                    ) : (
                        <View />
                    )}
                </View>
                {this.renderProductEntities(v).toList()}
            </Card>
        );
    };

    renderProductEntities = (meal: Map<string, ProductEntity>): Map<string, Element> => {
        return meal.map((v, k) => (
            <CardItem key={k} style={styles.row}>
                <Text>{v.name}</Text>
                <Text>{v.count} g</Text>
            </CardItem>
        ));
    };

    renderCommercialBanner = (): Element => {
        return (
            <View style={styles.commercialBanner}>
                <AdBanner />
            </View>
        );
    };

    calculateCurrentLimits = (): UserLimits => {
        let currentLimits = {
            calories: 0,
            carbohydrates: 0,
            fat: 0,
            proteins: 0,
        };
        if (this.props.dateJournal.get(this.state.chosenDate)) {
            const chosenDayJournal = this.props.dateJournal.get(this.state.chosenDate)!.toList();
            currentLimits = chosenDayJournal.reduce(
                (stats, meal) => meal.toList().reduce(this.addProductToCurrentLimit, stats),
                currentLimits,
            );
        }
        return currentLimits;
    };

    addProductToCurrentLimit = (currentLimits: UserLimits, product: ProductEntity): UserLimits => ({
        calories:
            currentLimits.calories + this.calculateSingleMacro(product.calories, product.count),
        carbohydrates:
            currentLimits.carbohydrates +
            this.calculateSingleMacro(product.carbohydrates, product.count),
        fat: currentLimits.fat + this.calculateSingleMacro(product.fat, product.count),
        proteins:
            currentLimits.proteins + this.calculateSingleMacro(product.proteins, product.count),
    });

    calculateSingleMacro = (inputValue: number, count: number) =>
        Math.round((inputValue / 100) * count * 100) / 100;

    renderDatepickerRow = (): Element => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: 5,
                }}
            >
                <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date(2018, 1, 1)}
                    maximumDate={new Date()}
                    locale={'pl'}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={'fade'}
                    androidMode={'default'}
                    placeHolderText="Wybierz datę"
                    textStyle={{ color: 'blue' }}
                    placeHolderTextStyle={{ color: 'black' }}
                    onDateChange={this.setDate}
                    disabled={false}
                />
                {this.renderButtons()}
            </View>
        );
    };

    renderButtons = (): Element => {
        return this.state.today === this.state.chosenDate ? (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}
            >
                <Button
                    info
                    onPress={this.props.showProfileView}
                    style={{ marginLeft: 5, marginRight: 5 }}
                >
                    <Icon name="body" />
                </Button>
                <Button
                    info
                    onPress={this.props.showNewMealOverlay}
                    style={{ marginLeft: 5, marginRight: 5 }}
                >
                    <Icon name="add" />
                </Button>
            </View>
        ) : (
            <View />
        );
    };

    setDate = (date: any): void => {
        this.setState({ chosenDate: formatDate(date) });
    };

    render(): JSX.Element {
        const currentLimits = this.calculateCurrentLimits();
        return (
            <View style={styles.container}>
                {this.renderDatepickerRow()}
                <LimitBars userLimits={this.props.limits} currentLimits={currentLimits} />
                {this.renderMeals()}
                {/*this.renderCommercialBanner()*/}
            </View>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    dateJournal: getDateJournal(state),
    limits: getUserLimits(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    showChooseProductModal: (mealName: string) => dispatch(new ShowChooseProductModal(mealName)),
    showNewMealOverlay: () => dispatch(new ShowNewMealOverlay()),
    showProfileView: () => dispatch(new ShowLimitsModal()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(JournalView);
