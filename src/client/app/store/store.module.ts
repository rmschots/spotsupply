import { NgModule } from '@angular/core';
import { StoreComponent } from './store.component';
import { StoreRoutingModule } from './store-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from '../shared/components/login/login.component';
import { LoginOptionsComponent } from '../shared/components/login/login-options.component';

@NgModule({
  imports: [SharedModule, StoreRoutingModule],
  declarations: [StoreComponent],
  exports: [StoreComponent],
  entryComponents: [LoginComponent, LoginOptionsComponent]
})

export class StoreModule {
}
