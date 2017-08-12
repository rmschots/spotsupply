import { ProductType } from './product-type';
import { Translations } from '../common/translations';
export class ProductCategory {
  constructor(public id: number,
              public name: Translations,
              public types: ProductType[],
              public sortingOrder: number) {
  }
}
