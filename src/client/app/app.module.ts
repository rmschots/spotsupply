import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { SettingsModule } from './settings/settings.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { Ng2PageScrollModule } from 'ng2-page-scroll/ng2-page-scroll';
import { ProductsModule } from './products/products.module';
import { FAQModule } from './faq/faq.module';
import { ContactModule } from './contact/contact.module';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from './store/store.module';
import { OrderInfoModule } from './order-info/order-info.module';
import { CreateAccountModule } from './create-account/create-account.module';
import { NguiMapModule } from '@ngui/map';
import { VerifyEmailModule } from './verify-email/verify-email.module';

import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/combineLatest';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SettingsModule,
    HomeModule,
    ProductsModule,
    FAQModule,
    ContactModule,
    StoreModule,
    OrderInfoModule,
    CreateAccountModule,
    VerifyEmailModule,
    SharedModule.forRoot(),
    MaterialModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBtYO0eJfiqw2AqMRu-0_X8gBVSUWiIymg'}),
    Ng2PageScrollModule.forRoot()
  ],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]
})

export class AppModule {
}
