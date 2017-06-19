import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VerifyEmailComponent } from './verify-email.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'verify-email/:verificationCode', component: VerifyEmailComponent}
    ])
  ],
  exports: [RouterModule]
})
export class VerifyEmailRoutingModule {
}
