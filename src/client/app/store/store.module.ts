import { NgModule } from '@angular/core';
import { StoreComponent } from './store.component';
import { StoreRoutingModule } from './store-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, StoreRoutingModule],
  declarations: [StoreComponent],
  exports: [StoreComponent]
})

export class StoreModule {
}
