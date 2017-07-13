import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { OrderManagerComponent } from './order-manager/order-manager.component';
import { CreateUpdateProductComponent } from './product-manager/create-product/create-update-product.component';
import { CreateUpdateProductTypeComponent } from './product-manager/create-product-type/create-update-product-type.component';
import { CreateUpdateProductCategoryComponent } from './product-manager/create-product-category/create-update-product-category.component';


@NgModule({
  imports: [SharedModule, AdminRoutingModule],
  declarations: [
    AdminComponent,
    DashboardComponent,
    ProductManagerComponent,
    UserManagerComponent,
    OrderManagerComponent,
    CreateUpdateProductComponent,
    CreateUpdateProductTypeComponent,
    CreateUpdateProductCategoryComponent
  ],
  exports: [AdminComponent],
  entryComponents: [
    CreateUpdateProductComponent,
    CreateUpdateProductTypeComponent,
    CreateUpdateProductCategoryComponent
  ]
})

export class AdminModule {
}
