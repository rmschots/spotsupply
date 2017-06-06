import { ProductType } from './product-type';
export class ProductCategory {
  constructor(public key: string,
              public types: ProductType[]) {
  }
}
