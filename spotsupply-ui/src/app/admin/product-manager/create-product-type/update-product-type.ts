import { Translations } from '../../../shared/objects/common/translations';
import { ProductCategory } from '../../../shared/objects/product/product-category';
import { ProductType } from '../../../shared/objects/product/product-type';
export class UpdateProductType {
  id: number;
  name: Translations;
  hasTitle: boolean;
  sortingOrder: number;
  productCategoryId: number;

  constructor(productType: ProductType, productCategory: ProductCategory) {
    this.id = productType.id;
    this.name = new Translations(productType.name.en, productType.name.nl, productType.name.fr);
    this.hasTitle = productType.hasTitle;
    this.productCategoryId = productCategory.id;
    this.sortingOrder = productType.sortingOrder;
  }
}
