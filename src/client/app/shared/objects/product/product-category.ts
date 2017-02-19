import { ProductType } from './product-type';
export class ProductCategory {
  constructor(public name: string,
              public types: ProductType[]) {
  }
}
