import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './reset-password.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'reset-password/:verificationCode', component: ResetPasswordComponent}
    ])
  ],
  exports: [RouterModule]
})
export class ResetPasswordRoutingModule {
}
