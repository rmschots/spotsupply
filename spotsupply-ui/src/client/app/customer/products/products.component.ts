import { Component } from '@angular/core';
import { NavigationService } from '../../shared/services/navigation/navigation.service';

@Component({
  moduleId: module.id,
  selector: 'ss-products',
  templateUrl: 'products.component.html',
  styleUrls: ['products.component.css']
})
export class ProductsComponent {
  constructor(private navigationService: NavigationService) {
    navigationService.setTitle('products');
  }
}
