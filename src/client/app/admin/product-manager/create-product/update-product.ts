import { Translations } from '../../../shared/objects/common/translations';
import { Product } from '../../../shared/objects/product/product';
import { ProductType } from '../../../shared/objects/product/product-type';
export class UpdateProduct {
  id: number;
  name: Translations;
  extraInfo: Translations;
  price: number;
  productTypes: Array<number>;
  active: boolean;

  constructor(product: Product, productType: Array<ProductType>) {
    this.id = product.id;
    this.name = new Translations(product.name.en, product.name.nl, product.name.fr);
    this.extraInfo = product.extraInfo
      ? new Translations(product.extraInfo.en, product.extraInfo.nl, product.extraInfo.fr)
      : new Translations();
    this.price = product.price;
    this.productTypes = productType.map(type => type.id);
    this.active = product.active;
  }
}
