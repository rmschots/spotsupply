import { NgModule } from '@angular/core';
import { ContactComponent } from './contact.component';
import { ContactRoutingModule } from './contact-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, ContactRoutingModule],
  declarations: [ContactComponent],
  exports: [ContactComponent]
})

export class ContactModule {
}
