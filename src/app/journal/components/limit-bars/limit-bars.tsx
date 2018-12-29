import { Icon } from 'native-base';
import React, { SFC } from 'react';
import { Text, View } from 'react-native';

import { UserLimits } from '../../models';

import styles from './style';

interface Props {
    userLimits: UserLimits;
    currentLimits: UserLimits;
}

const calculatePercentage = (limit: number, current: number): string =>
    limit <= current ? '100%' : `${Math.round((current * 100) / limit)}%`;

const calculateStyle = (limit: number, current: number): { width: string } => ({
    width: calculatePercentage(limit, current),
});

const round = (number: number) => Math.round(number * 100) / 100;

/*tslint:disable jsx-no-multiline-js */
export const LimitBars: SFC<Props> = props => (
    <View>
        <View style={styles.row}>
            <Icon name="flash" />
            <View style={styles.barContainer}>
                <View
                    style={[
                        styles.barProgress,
                        calculateStyle(props.userLimits.calories, props.currentLimits.calories),
                    ]}
                />
                <Text style={styles.text}>
                    {`${round(props.currentLimits.calories)} / ${props.userLimits.calories} kcal`}
                </Text>
            </View>
        </View>
        <View style={styles.row}>
            <Icon name="paw" />
            <View style={styles.barContainer}>
                <View
                    style={[
                        styles.barProgress,
                        calculateStyle(props.userLimits.proteins, props.currentLimits.proteins),
                    ]}
                />
                <Text style={styles.text}>
                    {`${round(props.currentLimits.proteins)} / ${props.userLimits.proteins} g`}
                </Text>
            </View>
        </View>
        <View style={styles.row}>
            <Icon name="nutrition" />
            <View style={styles.barContainer}>
                <View
                    style={[
                        styles.barProgress,
                        calculateStyle(
                            props.userLimits.carbohydrates,
                            props.currentLimits.carbohydrates,
                        ),
                    ]}
                />
                <Text style={styles.text}>
                    {`${round(props.currentLimits.carbohydrates)} / ${
                        props.userLimits.carbohydrates
                    } g`}
                </Text>
            </View>
        </View>
        <View style={styles.row}>
            <Icon name="color-filter" />
            <View style={styles.barContainer}>
                <View
                    style={[
                        styles.barProgress,
                        calculateStyle(props.userLimits.fat, props.currentLimits.fat),
                    ]}
                />
                <Text style={styles.text}>
                    {`${round(props.currentLimits.fat)} / ${props.userLimits.fat} g`}
                </Text>
            </View>
        </View>
    </View>
);
