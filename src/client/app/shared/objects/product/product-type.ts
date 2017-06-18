import { Product } from './product';
export class ProductType {
  constructor(public id: number,
              public key: string,
              public hasTitle: boolean,
              public products: Product[]) {
  }
}
