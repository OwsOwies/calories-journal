import { Map } from 'immutable';

import { ProductEntity } from './productEntity';

export type Day = Map<string, Map<string, ProductEntity>>;
