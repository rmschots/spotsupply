import { NgModule } from '@angular/core';
import { OrderInfoComponent } from './order-info.component';
import { OrderInfoRoutingModule } from './order-info-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ConfirmationInfoComponent } from './confirmation-info/confirmation-info.component';

@NgModule({
  imports: [SharedModule, FormsModule, OrderInfoRoutingModule],
  declarations: [OrderInfoComponent, ConfirmationInfoComponent],
  exports: [OrderInfoComponent],
  entryComponents: [ConfirmationInfoComponent]
})

export class OrderInfoModule {
}
