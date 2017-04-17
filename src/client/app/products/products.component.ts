import { Component } from '@angular/core';
import { NavigationService } from '../shared/services/navigation/navigation.service';
import { LoginModel } from '../shared/framework/models/login.model';

@Component({
  moduleId: module.id,
  selector: 'ss-products',
  templateUrl: 'products.component.html',
  styleUrls: ['products.component.css']
})
export class ProductsComponent {
  constructor(private navigationService: NavigationService, _loginModel: LoginModel) {
    navigationService.setTitle('products');
    _loginModel.loadAccount();
  }
}
