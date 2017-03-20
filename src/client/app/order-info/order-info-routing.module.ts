import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderInfoComponent } from './order-info.component';
import { AuthGuard } from '../shared/services/authguard/auth-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'order-info',
        component: OrderInfoComponent,
        canActivate: [AuthGuard]
      }
    ])
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrderInfoRoutingModule { }
