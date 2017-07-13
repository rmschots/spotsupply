import { Translations } from '../../../shared/objects/common/translations';
import { ProductCategory } from '../../../shared/objects/product/product-category';
export class CreateProductType {
  public name: Translations = new Translations();
  public hasTitle: boolean = true;
  public sortingOrder: number = 999;
  public productCategoryId: number;

  constructor(productCategory: ProductCategory) {
    this.productCategoryId = productCategory.id;
  }
}
