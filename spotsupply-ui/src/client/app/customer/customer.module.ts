import { Ng2PageScrollModule } from 'ng2-page-scroll/ng2-page-scroll';
import { NguiMapModule } from '@ngui/map';
import { MaterialModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { VerifyEmailModule } from './verify-email/verify-email.module';
import { CreateAccountModule } from './create-account/create-account.module';
import { OrderInfoModule } from './order-info/order-info.module';
import { StoreModule } from './store/store.module';
import { ContactModule } from './contact/contact.module';
import { FAQModule } from './faq/faq.module';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { SettingsModule } from './settings/settings.module';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    SettingsModule,
    HomeModule,
    ProductsModule,
    FAQModule,
    ContactModule,
    StoreModule,
    OrderInfoModule,
    CreateAccountModule,
    VerifyEmailModule,
    ResetPasswordModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBtYO0eJfiqw2AqMRu-0_X8gBVSUWiIymg'}),
    Ng2PageScrollModule.forRoot()
  ]
})

export class CustomerModule {
}
