import { NgModule } from '@angular/core';
import { OrderInfoComponent } from './order-info.component';
import { OrderInfoRoutingModule } from './order-info-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [SharedModule, FormsModule, OrderInfoRoutingModule],
  declarations: [OrderInfoComponent],
  exports: [OrderInfoComponent]
})

export class OrderInfoModule {
}
