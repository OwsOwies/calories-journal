import { Map } from 'immutable';
import { Card, CardItem } from 'native-base';
import { Icon } from 'native-base';
import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { formatDate } from '../../../shared';
import { AppState } from '../../../store';
import { ActionDispatcher } from '../../../store';
import { ShowChooseProductModal, ShowLimitsModal, ShowNewMealOverlay } from '../../actions';
import { Day, Meal } from '../../models';
import { getDateJournal } from '../../selectors';

import styles from './style';

interface Props {
    dateJournal: Map<string, Day>;
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
                    <TouchableOpacity style={styles.addProduct} onPress={showChooseProductModal}>
                        <Icon style={styles.icon} name="add" />
                    </TouchableOpacity>
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
                <Text>Tutaj miejsce na reklamę</Text>
            </View>
        );
    };

    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Text>TODO tu będą paski ile limitu macro wypełniliśmy</Text>
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
