import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { OrderManagerComponent } from './order-manager/order-manager.component';


@NgModule({
  imports: [SharedModule, AdminRoutingModule],
  declarations: [
    AdminComponent,
    DashboardComponent,
    ProductManagerComponent,
    UserManagerComponent,
    OrderManagerComponent
  ],
  exports: [AdminComponent]
})

export class AdminModule {
}
