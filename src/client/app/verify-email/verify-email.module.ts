import { NgModule } from '@angular/core';
import { VerifyEmailComponent } from './verify-email.component';
import { VerifyEmailRoutingModule } from './verify-email-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, VerifyEmailRoutingModule],
  declarations: [VerifyEmailComponent],
  exports: [VerifyEmailComponent]
})

export class VerifyEmailModule {
}
