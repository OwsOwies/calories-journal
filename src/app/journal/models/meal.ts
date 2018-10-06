import { Map } from 'immutable';

import { ProductEntity } from './productEntity';

export class Meal {
    name: string;
    entities: Map<number, ProductEntity>;

    constructor(name: string, entities: Map<number, ProductEntity> = Map()) {
        this.name = name;
        this.entities = entities;
    }

    addEntity(product: ProductEntity): Meal {
        return new Meal(this.name, this.entities.set(product.id, product));
    }
}
