import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FAQComponent } from './faq.component';
import { FAQRoutingModule } from './faq-routing.module';

@NgModule({
  imports: [CommonModule, FAQRoutingModule],
  declarations: [FAQComponent],
  exports: [FAQComponent]
})

export class FAQModule {
}
