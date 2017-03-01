import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { NavigationService } from './services/navigation/index';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { Http } from '@angular/http';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ShoppingCartService } from './services/shopping-cart/shopping-cart.service';
import { CartComponent } from './components/cart/cart.component';
import { LanguageService } from './services/language/language.service';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, '/assets/i18n', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [ToolbarComponent, NavbarComponent, ProductListComponent, CartComponent],
  exports: [ToolbarComponent, NavbarComponent, TranslateModule,
    CommonModule, FormsModule, RouterModule, MaterialModule, ProductListComponent, CartComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [NavigationService, ShoppingCartService, LanguageService]
    };
  }
}
