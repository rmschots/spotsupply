export class Product {
  constructor(public id: number,
              public name: string,
              public extraInfo: string,
              public price: number) {
  }

  toString() {
    return this.id;
  }
}
