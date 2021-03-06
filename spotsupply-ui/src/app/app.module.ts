import 'hammerjs';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CustomerModule } from './customer/customer.module';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';

import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/catch';
import { HttpClientModule } from '@angular/common/http';
import { SpotsupplyMaterialModule } from './shared/spotsupply-material.module';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    CustomerModule,
    AdminModule,
    SpotsupplyMaterialModule,
    SharedModule.forRoot()
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule {
}
