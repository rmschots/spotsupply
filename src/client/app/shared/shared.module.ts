import { ModuleWithProviders, NgModule } from '@angular/core';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { NavigationService } from './services/navigation/index';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { Http } from '@angular/http';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { LanguageService } from './services/language/language.service';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/guards/auth-guard.service';
import { LoginOptionsComponent } from './components/login/login-options.component';
import { LocationLoadingComponent } from './components/location-loading/location-loading.component';
import { BeachModel } from './framework/models/beach.model';
import { StoreModule } from '@ngrx/store';
import { beachReducer } from './framework/reducers/beach.reducer';
import { LoginModel } from './framework/models/login.model';
import { RestGatewayService } from './services/gateway/rest-gateway.service';
import { loginReducer } from './framework/reducers/login.reducer';
import { LocationModel } from './framework/models/location.model';
import { productReducer } from './framework/reducers/product.reducer';
import { ProductsModel } from './framework/models/products.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShoppingCartModel } from './framework/models/shopping-cart.model';
import { locationReducer } from './framework/reducers/location.reducer';
import { cartReducer } from './framework/reducers/cart.reducer';
import { PasswordValidatorDirective } from './directives/password-validator.directive';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { PhoneNumberValidatorDirective } from './directives/phone-number-validator.directive';
import { StartupService } from './services/startup/startup.service';
import { deliveryReducer } from './framework/reducers/delivery.reducer';
import { DeliveryModel } from './framework/models/delivery.model';
import { ResetPasswordComponent } from './components/login/reset-password.component';
import { SSTranslatePipe } from './pipes/ss-translation.pipe';
import { SSActivePipe } from './pipes/ss-active.pipe';
import { CdkTableModule } from '@angular/cdk';
import { LoadingDialogComponent } from './components/loading/loading-dialog.component';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CdkTableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    BrowserAnimationsModule,
    StoreModule.provideStore({
      beaches: beachReducer,
      login: loginReducer,
      location: locationReducer,
      product: productReducer,
      cart: cartReducer,
      delivery: deliveryReducer
    }),
    PasswordStrengthBarModule
  ],
  declarations: [ToolbarComponent, NavbarComponent, ProductListComponent, CartComponent, LoginComponent, LoginOptionsComponent,
    LocationLoadingComponent, PasswordValidatorDirective, PhoneNumberValidatorDirective, ResetPasswordComponent, SSTranslatePipe,
    SSActivePipe, LoadingDialogComponent],
  exports: [ToolbarComponent, NavbarComponent, TranslateModule, CommonModule, FormsModule, RouterModule, MaterialModule, CdkTableModule,
    ProductListComponent, CartComponent, LoginComponent, LoginOptionsComponent, LocationLoadingComponent, ResetPasswordComponent,
    PasswordValidatorDirective, PasswordStrengthBarModule, PhoneNumberValidatorDirective, SSTranslatePipe, SSActivePipe,
    LoadingDialogComponent],
  entryComponents: [LocationLoadingComponent, LoadingDialogComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        NavigationService,
        LanguageService,
        AuthGuard,
        BeachModel,
        LoginModel,
        LocationModel,
        ProductsModel,
        ShoppingCartModel,
        DeliveryModel,
        RestGatewayService,
        StartupService,
        {provide: APP_BASE_HREF, useValue: '<%= APP_BASE %>'}
      ]
    };
  }
}
