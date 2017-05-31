export class Product {
  constructor(public id: number,
              public key: string,
              public price: number) {
  }

  toString() {
    return this.id;
  }
}
