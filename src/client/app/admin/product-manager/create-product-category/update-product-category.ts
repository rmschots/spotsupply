import { Translations } from '../../../shared/objects/common/translations';
import { ProductCategory } from '../../../shared/objects/product/product-category';
export class UpdateProductCategory {
  id: number;
  name: Translations;
  sortingOrder: number;

  constructor(productCategory: ProductCategory) {
    this.id = productCategory.id;
    this.name = new Translations(productCategory.name.en, productCategory.name.nl, productCategory.name.fr);
    this.sortingOrder = productCategory.sortingOrder;
  }
}
