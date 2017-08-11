import { Product } from './product';
import { Translations } from '../common/translations';
export class ProductType {
  constructor(public id: number,
              public name: Translations,
              public hasTitle: boolean,
              public sortingOrder: number,
              public products: Product[]) {
  }
}
