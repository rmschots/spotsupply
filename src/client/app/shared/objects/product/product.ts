import { Translations } from '../common/translations';
export class Product {
  constructor(public id: number,
              public name: Translations,
              public extraInfo: Translations,
              public price: number) {
  }

  toString() {
    return this.id;
  }
}
