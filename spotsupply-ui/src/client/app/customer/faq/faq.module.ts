import { NgModule } from '@angular/core';
import { FAQComponent } from './faq.component';
import { FAQRoutingModule } from './faq-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [SharedModule, FAQRoutingModule],
  declarations: [FAQComponent],
  exports: [FAQComponent]
})

export class FAQModule {
}
