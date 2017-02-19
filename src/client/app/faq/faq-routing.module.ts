import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FAQComponent } from './faq.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'faq', component: FAQComponent }
    ])
  ],
  exports: [RouterModule]
})
export class FAQRoutingModule { }
