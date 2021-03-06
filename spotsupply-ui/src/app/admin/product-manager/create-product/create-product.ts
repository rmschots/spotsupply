import { Translations } from '../../../shared/objects/common/translations';
import { ProductType } from '../../../shared/objects/product/product-type';
export class CreateProduct {
  public productTypes: Array<number>;
  public name: Translations = new Translations();
  public extraInfo: Translations = new Translations();
  public price = 1.0;
  public active = false;

  constructor(productType: ProductType) {
    this.productTypes = [productType.id];
  }
}
