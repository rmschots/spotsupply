import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderInfoComponent } from './order-info.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'order-info', component: OrderInfoComponent }
    ])
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrderInfoRoutingModule { }
