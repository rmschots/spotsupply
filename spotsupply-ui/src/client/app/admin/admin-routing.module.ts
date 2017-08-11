import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../shared/services/guards/auth-guard.service';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { OrderManagerComponent } from './order-manager/order-manager.component';
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: '/admin/dashboard',
            pathMatch: 'full'
          },
          {
            path: 'dashboard',
            component: DashboardComponent
          },
          {
            path: 'product-manager',
            component: ProductManagerComponent
          },
          {
            path: 'user-manager',
            component: UserManagerComponent
          },
          {
            path: 'order-manager',
            component: OrderManagerComponent
          }
        ]
      }
    ])
  ],
  exports: [RouterModule],
  schemas: []
})
export class AdminRoutingModule {
}
