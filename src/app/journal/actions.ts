import { Action } from '../store';

import { Product, ProductEntity, Recipe } from './models';

export enum JournalActionTypes {
    SHOW_ADD_MEAL_OVERLAY = '[Journal] Show Add Meal Overlay',
    SHOW_CHOOSE_PRODUCT_MODAL = '[Journal] Show Choose Product Modal',
    ADD_MEAL = '[Journal] Add Meal',
    ADD_TO_MEAL = '[Journal] Add To Meal',
    REMOVE_FROM_MEAL = '[Journal] Remove From Meal',
    CHOOSE_PRODUCT_FOR_WEIGHTING = '[Journal] Choose Product For Weighting',
    CHOOSE_RECIPE_FOR_WEIGHTING = '[Journal] Choose Recipe For Weighting',
    SHOW_WEIGHTING_MODAL = '[Journal] Show Weighting Modal',
    FINISH_WEIGHTING = '[Journal] Finish Weighting',
}

export class ShowNewMealOverlay implements Action {
    readonly type = JournalActionTypes.SHOW_ADD_MEAL_OVERLAY;
}

export class AddMeal implements Action<string> {
    readonly type = JournalActionTypes.ADD_MEAL;
    constructor(public payload: string) {
        this.payload = payload;
    }
}

export class AddToMeal implements Action<ProductEntity> {
    readonly type = JournalActionTypes.ADD_TO_MEAL;
    constructor(public payload: ProductEntity) {
        this.payload = payload;
    }
}

export class RemoveFromMeal implements Action<ProductEntity> {
    readonly type = JournalActionTypes.REMOVE_FROM_MEAL;
    constructor(public payload: ProductEntity) {
        this.payload = payload;
    }
}

export class ShowChooseProductModal implements Action<string> {
    readonly type = JournalActionTypes.SHOW_CHOOSE_PRODUCT_MODAL;
    constructor(public payload: string) {
        this.payload = payload;
    }
}

export class ChooseProductForWeighting implements Action<Product> {
    readonly type = JournalActionTypes.CHOOSE_PRODUCT_FOR_WEIGHTING;
    constructor(public payload: Product) {
        this.payload = payload;
    }
}

export class ChooseRecipeForWeighting implements Action<Recipe> {
    readonly type = JournalActionTypes.CHOOSE_RECIPE_FOR_WEIGHTING;
    constructor(public payload: Recipe) {
        this.payload = payload;
    }
}

export class ShowWeightingModal implements Action {
    readonly type = JournalActionTypes.SHOW_WEIGHTING_MODAL;
}

export class FinishWeighting implements Action {
    readonly type = JournalActionTypes.FINISH_WEIGHTING;
}

export type AuthAction =
    | AddMeal
    | AddToMeal
    | RemoveFromMeal
    | ShowChooseProductModal
    | ShowNewMealOverlay
    | ChooseProductForWeighting
    | ShowWeightingModal
    | ChooseRecipeForWeighting
    | FinishWeighting;
