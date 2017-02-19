import { Component } from '@angular/core';
import { NavigationService } from '../shared/services/navigation/navigation.service';

@Component({
  moduleId: module.id,
  selector: 'ss-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.css']
})
export class ProductListComponent {
  constructor(private navigationService: NavigationService) {
    navigationService.setTitle('productList');
  }
}
