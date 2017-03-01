import { NgModule } from '@angular/core';
import { StoreComponent } from './store.component';
import { StoreRoutingModule } from './store-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CheckoutAsComponent } from './checkout-as/checkout-as.component';

@NgModule({
  imports: [SharedModule, StoreRoutingModule],
  declarations: [StoreComponent, CheckoutAsComponent],
  exports: [StoreComponent],
  entryComponents: [CheckoutAsComponent]
})

export class StoreModule {
}
