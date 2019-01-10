import { Map } from 'immutable';
import { Icon } from 'native-base';
import { Button, Card, CardItem } from 'native-base';
import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
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
}

class JournalView extends Component<Props, State> {
    readonly state = {
        chosenDate: formatDate(new Date()),
    };

    // tslint:disable jsx-no-multiline-js
    renderMeals(): Element | undefined {
        const chosenDayJournal = this.props.dateJournal.get(this.state.chosenDate);
        return chosenDayJournal && <View>{chosenDayJournal.toList().map(this.renderMeal)}</View>;
    }

    renderMeal = (meal: Meal): Element => {
        const showChooseProductModal = this.props.showChooseProductModal.bind(null, meal.name);
        return (
            <Card key={meal.name}>
                <View style={styles.meal}>
                    <Text>{meal.name}</Text>
                    <Button style={styles.btn} onPress={showChooseProductModal}>
                        <Text style={styles.btnTxt}>Dodaj produkt</Text>
                    </Button>
                </View>
                {this.renderProductEntities(meal)}
            </Card>
        );
    };

    renderProductEntities = (meal: Meal): Element => {
        return meal.entities.toList().map(entity => (
            <CardItem style={styles.row}>
                <Text>{entity.name}</Text>
                <Text>{entity.count} g</Text>
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
                (stats, meal) =>
                    meal.entities.toList().reduce(this.addProductToCurrentLimit, stats),
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

    render(): JSX.Element {
        const currentLimits = this.calculateCurrentLimits();
        return (
            <View style={styles.container}>
                <LimitBars userLimits={this.props.limits} currentLimits={currentLimits} />
                {this.renderMeals()}
                <TouchableOpacity style={styles.fab2} onPress={this.props.showProfileView}>
                    <Icon style={styles.icon} name="body" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.fab} onPress={this.props.showNewMealOverlay}>
                    <Icon style={styles.icon} name="add" />
                </TouchableOpacity>
                {this.renderCommercialBanner()}
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
