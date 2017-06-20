import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ss-product-manager',
  templateUrl: 'product-manager.component.html',
  styleUrls: ['product-manager.component.css']
})
export class ProductManagerComponent {

  constructor() {
    console.log('product manager');
  }
}
