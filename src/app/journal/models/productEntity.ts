import { Product } from './product';

export interface ProductEntity extends Product {
    count: number;
    mealName: string;
}
