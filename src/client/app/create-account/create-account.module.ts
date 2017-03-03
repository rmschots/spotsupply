import { NgModule } from '@angular/core';
import { CreateAccountComponent } from './create-account.component';
import { CreateAccountRoutingModule } from './create-account-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, CreateAccountRoutingModule],
  declarations: [CreateAccountComponent],
  exports: [CreateAccountComponent]
})

export class CreateAccountModule {
}
