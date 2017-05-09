import { NgModule } from '@angular/core';
import { StoreComponent } from './store.component';
import { StoreRoutingModule } from './store-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from '../shared/components/login/login.component';
import { LoginOptionsComponent } from '../shared/components/login/login-options.component';
import { AtBeachGuard } from '../shared/services/guards/at-beach-guard.service';
import { HasCartGuard } from '../shared/services/guards/has-cart-guard.service';

@NgModule({
  imports: [SharedModule, StoreRoutingModule],
  declarations: [StoreComponent],
  exports: [StoreComponent],
  entryComponents: [LoginComponent, LoginOptionsComponent],
  providers: [AtBeachGuard, HasCartGuard]
})

export class StoreModule {
}
