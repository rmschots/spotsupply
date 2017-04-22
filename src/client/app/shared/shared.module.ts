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
import { ShoppingCartService } from './services/shopping-cart/shopping-cart.service';
import { CartComponent } from './components/cart/cart.component';
import { LanguageService } from './services/language/language.service';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user/user.service';
import { AuthGuard } from './services/authguard/auth-guard.service';
import { LoginOptionsComponent } from './components/login/login-options.component';
import { LocationLoadingComponent } from './services/location/components/location-loading.component';
import { BeachModel } from './framework/models/beach.model';
import { StoreModule } from '@ngrx/store';
import { beachReducer } from './framework/reducers/beach.reducer';
import { LoginModel } from './framework/models/login.model';
import { RestGatewayService } from './services/gateway/rest-gateway.service';
import { loginReducer } from './framework/reducers/login.reducer';
import {
  locationPermissionReducer,
  userAtBeachReducer,
  userPositionReducer
} from './framework/reducers/user-location.reducer';
import { LocationModel } from './framework/models/location.model';
import { productReducer } from './framework/reducers/product.reducer';
import { ProductsModel } from './framework/models/products.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
      locationPermissionStatus: locationPermissionReducer,
      lastKnownLocation: userPositionReducer,
      atBeach: userAtBeachReducer,
      productHierarchy: productReducer
    }),
  ],
  declarations: [ToolbarComponent, NavbarComponent, ProductListComponent, CartComponent, LoginComponent, LoginOptionsComponent,
    LocationLoadingComponent],
  exports: [ToolbarComponent, NavbarComponent, TranslateModule, CommonModule, FormsModule, RouterModule, MaterialModule,
    ProductListComponent, CartComponent, LoginComponent, LoginOptionsComponent, LocationLoadingComponent],
  entryComponents: [LocationLoadingComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        NavigationService,
        ShoppingCartService,
        LanguageService,
        UserService,
        AuthGuard,
        BeachModel,
        LoginModel,
        LocationModel,
        ProductsModel,
        RestGatewayService,
        {provide: APP_BASE_HREF, useValue: '<%= APP_BASE %>'}
      ]
    };
  }
}
