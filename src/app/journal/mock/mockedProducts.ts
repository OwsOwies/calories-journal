import { Product, Recipe } from '../models';

export const mockedProducts: Product[] = [
    {
        calories: 106,
        carbohydrates: 1.18,
        fat: 1.76,
        id: 1,
        name: 'Pierś z kurczaka',
        proteins: 21.18,
    },
    {
        calories: 88,
        carbohydrates: 23,
        fat: 0.3,
        id: 2,
        name: 'Banan',
        proteins: 1.1,
    },
    {
        calories: 88,
        carbohydrates: 28,
        fat: 0.3,
        id: 3,
        name: 'Ryż',
        proteins: 2.7,
    },
    {
        calories: 131,
        carbohydrates: 25,
        fat: 1.1,
        id: 4,
        name: 'Makaron',
        proteins: 5,
    },
    {
        calories: 131,
        carbohydrates: 0,
        fat: 15,
        id: 5,
        name: 'Wołowina',
        proteins: 26,
    },
];

export const recipe: Recipe = { items: [mockedProducts[0], mockedProducts[2]], name: 'obiad' };
