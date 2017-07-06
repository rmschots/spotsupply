import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { OrderManagerComponent } from './order-manager/order-manager.component';
import { CreateUpdateProductComponent } from './product-manager/create-product/create-update-product.component';
import { CreateProductTypeComponent } from './product-manager/create-product-type/create-product-type.component';
import { CreateProductCategoryComponent } from './product-manager/create-product-category/create-product-category.component';


@NgModule({
  imports: [SharedModule, AdminRoutingModule],
  declarations: [
    AdminComponent,
    DashboardComponent,
    ProductManagerComponent,
    UserManagerComponent,
    OrderManagerComponent,
    CreateUpdateProductComponent,
    CreateProductTypeComponent,
    CreateProductCategoryComponent
  ],
  exports: [AdminComponent],
  entryComponents: [
    CreateUpdateProductComponent,
    CreateProductTypeComponent,
    CreateProductCategoryComponent
  ]
})

export class AdminModule {
}
