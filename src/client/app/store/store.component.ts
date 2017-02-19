import { Component } from '@angular/core';
import { NavigationService } from '../shared/services/navigation/navigation.service';
import { ProductCategory } from '../shared/objects/product/product-category';

@Component({
  moduleId: module.id,
  selector: 'ss-store',
  templateUrl: 'store.component.html',
  styleUrls: ['store.component.css']
})
export class StoreComponent {

  categories: ProductCategory[] = [];

  constructor(private navigationService: NavigationService) {
    navigationService.setTitle('store');
  }
}
