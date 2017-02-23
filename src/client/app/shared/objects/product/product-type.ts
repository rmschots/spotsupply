import { Product } from './product';
export class ProductType {
  constructor(public id: number,
              public name: string,
              public hasTitle: boolean,
              public products: Product[]) {
  }
}
