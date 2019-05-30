import {
    Body,
    Button,
    Content,
    Form,
    Header,
    Input,
    Item,
    Label,
    Left,
    Text,
    Title,
} from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ActionDispatcher } from '../../../store';
import { SaveNewProduct } from '../../actions';
import { Product } from '../../models';

interface Props {
    saveProduct: ActionDispatcher<SaveNewProduct>;
}

interface State {
    readonly name: string;
    readonly calories: number;
    readonly proteins: number;
    readonly carbohydrates: number;
    readonly fat: number;
}

class NewProductView extends Component<Props, State> {
    readonly state = {
        name: '',
        calories: 0,
        proteins: 0,
        carbohydrates: 0,
        fat: 0,
    };

    onInputChangeName = (text: string): void => {
        this.setState({ name: text });
    };

    onInputChangeCalories = (text: string): void => {
        this.setState({ calories: parseInt(text, 10) });
    };

    onInputChangeProteins = (text: string): void => {
        this.setState({ proteins: parseInt(text, 10) });
    };

    onInputChangeCarbohydrates = (text: string): void => {
        this.setState({ carbohydrates: parseInt(text, 10) });
    };

    onInputChangeFat = (text: string): void => {
        this.setState({ fat: parseInt(text, 10) });
    };

    onButtonPress = (): void => {
        this.props.saveProduct({ id: new Date().getTime(), ...this.state });
    };

    render(): JSX.Element {
        return (
            <Content>
                <Header>
                    <Left />
                    <Body>
                        <Title>Nowy produkt</Title>
                    </Body>
                </Header>
                <Form>
                    <Item stackedLabel>
                        <Label>Nazwa produktu</Label>
                        <Input onChangeText={this.onInputChangeName} value={this.state.name} />
                    </Item>
                    <Item stackedLabel last>
                        <Label>Kalorie</Label>
                        <Input
                            placeholder="0"
                            keyboardType="numeric"
                            onChangeText={this.onInputChangeCalories}
                            value={this.state.calories.toString()}
                        />
                    </Item>
                    <Item stackedLabel last>
                        <Label>Białko [g]</Label>
                        <Input
                            placeholder="0"
                            keyboardType="numeric"
                            onChangeText={this.onInputChangeProteins}
                            value={this.state.proteins.toString()}
                        />
                    </Item>
                    <Item stackedLabel last>
                        <Label>Węglowodany [g]</Label>
                        <Input
                            placeholder="0"
                            keyboardType="numeric"
                            onChangeText={this.onInputChangeCarbohydrates}
                            value={this.state.carbohydrates.toString()}
                        />
                    </Item>
                    <Item stackedLabel last>
                        <Label>Tłuszcze [g]</Label>
                        <Input
                            placeholder="0"
                            keyboardType="numeric"
                            onChangeText={this.onInputChangeFat}
                            value={this.state.fat.toString()}
                        />
                    </Item>
                </Form>
                <Button
                    onPress={this.onButtonPress}
                    full
                    rounded
                    info
                    style={{ margin: 10, marginTop: 150 }}
                >
                    <Text>Zapisz nowy produkt</Text>
                </Button>
            </Content>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    saveProduct: (product: Product) => dispatch(new SaveNewProduct(product)),
});

export default connect(
    null,
    mapDispatchToProps,
)(NewProductView);
