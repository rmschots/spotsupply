import { Product } from './product';
export class ProductType {
  constructor(public name: string,
              public hasTitle: boolean,
              public products: Product[]) {
  }
}
